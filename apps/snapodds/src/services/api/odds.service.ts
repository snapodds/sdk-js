import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Competitor,
  OddsBestOffer,
  OddsBestOfferOutcome,
  OddsOffer,
  OddsOfferOutcome,
  OddsResponse,
  SportsBook,
} from '@response/typings';
import { map, Observable, switchMap } from 'rxjs';
import { BestOfferViewModel } from '../../models/best-offer-view-model';
import { LineOdds } from '../../models/line-odds';
import { SportsBookViewModel } from '../../models/sports-book-view-model';
import { AuthService } from '../auth/auth.service';
import { ApplicationConfigService } from '../config/application-config.service';

@Injectable({
  providedIn: 'root',
})
export class OddsService {
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly applicationConfigService: ApplicationConfigService
  ) {}

  /**
   * Retrieve the apiUrl from the applicationConfig
   */
  get baseUrl() {
    return this.applicationConfigService.getApiUrl();
  }

  /**
   * Search for the LineOdds by a sportEventId
   * @param sportEventId: The identifier of the sportEvent
   */
  gameLineOddsBySportEventId(sportEventId: number): Observable<LineOdds> {
    return this.authService.requestAccessToken().pipe(
      switchMap((accessToken) =>
        this.http.get<OddsResponse>(`${this.baseUrl}/sport/events/${sportEventId}/odds/lines`, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      ),
      map((response) => this.mapLineOddsResponse(response))
    );
  }

  /**
   * Converts the LineOdds into a better data structure for rendering it
   * @param lineOdds
   * @private
   */
  private mapLineOddsResponse(lineOdds: OddsResponse): LineOdds {
    const { competitors, players = [], sportsBooks, bestOffers } = lineOdds;

    if (competitors?.length < 2 || !sportsBooks) {
      return { competitors, players };
    }

    const sportsBooksViewModel = this.mapSportsBooksToViewModel(sportsBooks, competitors);
    const bestOfferViewModel = this.mapBestOfferToViewModel(bestOffers, competitors);

    return { competitors, players, sportsBooks: sportsBooksViewModel, bestOffer: bestOfferViewModel };
  }

  /**
   * Map the SportsBooksResponse from the API into a flatter data structure optimized for rendering
   * @param sportsBooks
   * @param competitors
   * @private
   */
  private mapSportsBooksToViewModel(sportsBooks: SportsBook[], competitors: Competitor[]): SportsBookViewModel[] {
    const sportsBookViewModels: SportsBookViewModel[] = [];

    sportsBooks
      .filter((sportsBook) => sportsBook.offers)
      .map((sportsBook) => {
        const target: SportsBookViewModel = {
          name: sportsBook.name,
          lines: competitors.map(() => ({} as never)),
          redirectUrl: sportsBook._links?.redirect?.href,
        };

        sportsBook.offers
          .filter((offer) => offer.outcomes)
          .forEach((offer) =>
            offer.outcomes.forEach((outcome) => this.mapToOfferLines(outcome, competitors, offer, target))
          );

        if (target.lines.length > 0) {
          sportsBookViewModels.push(target);
        }
      });

    return sportsBookViewModels;
  }

  /**
   * Map the BestOfferResponse from the API into a flatter data structure optimized for rendering
   * @param offers
   * @param competitors
   * @private
   */
  private mapBestOfferToViewModel(
    offers: OddsBestOffer[] | undefined,
    competitors: Competitor[]
  ): undefined | BestOfferViewModel {
    if (offers === undefined) return undefined;

    const bestOfferViewModel: BestOfferViewModel = {
      name: 'Best of Odds',
      lines: competitors.map(() => ({} as never)),
    };

    offers.forEach((offer) => {
      offer.outcomes.forEach((outcome) => {
        this.mapToOfferLines(outcome, competitors, offer, bestOfferViewModel);
        this.mapSportsBooksNames(outcome, competitors, offer, bestOfferViewModel);
      });
    });

    return bestOfferViewModel;
  }

  /**
   * Extract the lines from the given outcomes
   * @param outcome
   * @param competitors
   * @param offer
   * @param viewModel
   * @private
   */
  private mapToOfferLines(
    outcome: OddsOfferOutcome,
    competitors: Competitor[],
    offer: OddsOffer,
    viewModel: SportsBookViewModel
  ) {
    const competitorIndex = this.findCompetitorIndexById(competitors, outcome.competitorId);
    const hasCompetitor = competitorIndex > -1;
    const redirectUrl = outcome._links?.redirect?.href;

    if (offer.type === 'MONEYLINE' && outcome.type === 'WIN' && hasCompetitor) {
      viewModel.lines[competitorIndex].moneyline = this.convertToAmericanOdds(outcome.odds);
      viewModel.lines[competitorIndex].moneylineBest = outcome.best === true;

      if (redirectUrl) {
        viewModel.lines[competitorIndex].moneylineUrl = redirectUrl;
      }
    } else if (offer.type === 'OVER_UNDER' && outcome.type === 'OVER') {
      viewModel.lines[0].overUnder = outcome.target ?? null;
      viewModel.lines[0].overUnderOdds = this.convertToAmericanOdds(outcome.odds);
      viewModel.lines[0].overUnderBest = outcome.best === true;

      if (redirectUrl) {
        viewModel.lines[0].overUnderUrl = redirectUrl;
      }
    } else if (offer.type === 'OVER_UNDER' && outcome.type === 'UNDER') {
      viewModel.lines[1].overUnder = outcome.target ?? null;
      viewModel.lines[1].overUnderOdds = this.convertToAmericanOdds(outcome.odds);
      viewModel.lines[1].overUnderBest = outcome.best === true;

      if (redirectUrl) {
        viewModel.lines[1].overUnderUrl = redirectUrl;
      }
    } else if (offer.type === 'SPREAD' && outcome.type === 'WIN' && hasCompetitor) {
      viewModel.lines[competitorIndex].spread = outcome.target ?? null;
      viewModel.lines[competitorIndex].spreadOdds = this.convertToAmericanOdds(outcome.odds);
      viewModel.lines[competitorIndex].spreadBest = outcome.best === true;

      if (redirectUrl) {
        viewModel.lines[competitorIndex].spreadUrl = redirectUrl;
      }
    }
  }

  /**
   * Extract the sportsBooksName from the given outcomes
   * @param outcome
   * @param competitors
   * @param offer
   * @param viewModel
   * @private
   */
  private mapSportsBooksNames(
    outcome: OddsBestOfferOutcome,
    competitors: Competitor[],
    offer: OddsBestOffer,
    viewModel: BestOfferViewModel
  ) {
    const competitorIndex = this.findCompetitorIndexById(competitors, outcome.competitorId);
    const hasCompetitor = competitorIndex > -1;

    if (offer.type === 'MONEYLINE' && outcome.type === 'WIN' && hasCompetitor) {
      viewModel.lines[competitorIndex].moneySportsBookName = outcome.sportsBook;
    } else if (offer.type === 'OVER_UNDER' && outcome.type === 'OVER') {
      viewModel.lines[0].overUnderSportsBookName = outcome.sportsBook;
    } else if (offer.type === 'OVER_UNDER' && outcome.type === 'UNDER') {
      viewModel.lines[1].overUnderSportsBookName = outcome.sportsBook;
    } else if (offer.type === 'SPREAD' && outcome.type === 'WIN' && hasCompetitor) {
      viewModel.lines[competitorIndex].spreadSportsBookName = outcome.sportsBook;
    }
  }

  /**
   * Return the index of the competitor used to find the position in the array response
   * @param competitors
   * @param competitorId
   * @private
   */
  private findCompetitorIndexById(competitors: Competitor[], competitorId: number | undefined): number {
    return competitors.findIndex((competitor) => competitor.id === competitorId);
  }

  /**
   * Convert the odds to be displayed in american style
   * @param odds
   * @private
   */
  private convertToAmericanOdds(odds: number): null | number {
    if (!odds || odds <= 1) {
      return null;
    } else if (odds < 2) {
      return Math.round((-1 / (odds - 1)) * 100);
    } else {
      return Math.round((odds - 1) * 100);
    }
  }
}
