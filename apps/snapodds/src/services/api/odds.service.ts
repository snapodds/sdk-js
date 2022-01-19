import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OddsResponse } from '@response/typings';
import { map, Observable } from 'rxjs';
import { LineOdds } from '../../models/line-odds';
import { SportsBook } from '../../models/sports-book';
import { AuthService } from '../auth/auth.service';
import { ApplicationConfigService } from '../config/application-config.service';

@Injectable({
  providedIn: 'root',
})
export class OddsService {
  constructor(
    private readonly http: HttpClient,
    private readonly applicationConfigService: ApplicationConfigService,
    private readonly authService: AuthService
  ) {}

  get baseUrl() {
    return this.applicationConfigService.getApiUrl();
  }

  gameLineOddsBySportEventId(sportEventId: number): Observable<LineOdds> {
    return this.http
      .get<OddsResponse>(`${this.baseUrl}/sport/events/${sportEventId}/odds/lines`, {
        headers: this.authService.createAuthHeaders(),
      })
      .pipe(map((response) => this.mapLineOddsResponse(response)));
  }

  private mapLineOddsResponse(lineOdds: OddsResponse): LineOdds {
    const { competitors, players = [], sportsBooks } = lineOdds;

    if (competitors?.length < 2 || !sportsBooks) {
      return { competitors, players };
    }

    const sportsBookLines: SportsBook[] = [];
    sportsBooks
      .filter((sportsBook) => sportsBook.offers)
      .map((sportsBook) => {
        const converted: SportsBook = {
          name: sportsBook.name,
          lines: competitors.map(() => ({} as never)),
          redirectUrl: sportsBook._links?.redirect?.href,
        };

        sportsBook.offers
          .filter((offer) => offer.outcomes)
          .forEach((offer) => {
            offer.outcomes.forEach((outcome) => {
              const competitorIndex = competitors.findIndex((competitor) => competitor.id === outcome.competitorId);
              const hasCompetitor = competitorIndex > -1;
              const redirectUrl = outcome._links?.redirect?.href;

              if (offer.type === 'MONEYLINE' && outcome.type === 'WIN' && hasCompetitor) {
                converted.lines[competitorIndex].moneyline = this.convertToAmericanOdds(outcome.odds);

                if (redirectUrl) {
                  converted.lines[competitorIndex].moneylineUrl = redirectUrl;
                }
              } else if (offer.type === 'OVER_UNDER' && outcome.type === 'OVER') {
                converted.lines[0].overUnder = outcome.target ?? null;
                converted.lines[0].overUnderOdds = this.convertToAmericanOdds(outcome.odds);

                if (redirectUrl) {
                  converted.lines[0].overUnderUrl = redirectUrl;
                }
              } else if (offer.type === 'OVER_UNDER' && outcome.type === 'UNDER') {
                converted.lines[1].overUnder = outcome.target ?? null;
                converted.lines[1].overUnderOdds = this.convertToAmericanOdds(outcome.odds);

                if (redirectUrl) {
                  converted.lines[1].overUnderUrl = redirectUrl;
                }
              } else if (offer.type === 'SPREAD' && outcome.type === 'WIN' && hasCompetitor) {
                converted.lines[competitorIndex].spread = outcome.target ?? null;
                converted.lines[competitorIndex].spreadOdds = this.convertToAmericanOdds(outcome.odds);

                if (redirectUrl) {
                  converted.lines[competitorIndex].spreadUrl = redirectUrl;
                }
              }
            });
          });

        if (converted.lines.length > 0) {
          sportsBookLines.push(converted);
        }
      });

    return { competitors, players, sportsBooks: sportsBookLines };
  }

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
