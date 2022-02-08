'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">SnapOdds SDK</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-20071abfeaa802372d0e656593775f8e7130cb4c10c3dff022ea22b5e719bf77830b2ee89d9998a297422415394ec82b192fc1984749b897531ec0412e8d2a30"' : 'data-target="#xs-components-links-module-AppModule-20071abfeaa802372d0e656593775f8e7130cb4c10c3dff022ea22b5e719bf77830b2ee89d9998a297422415394ec82b192fc1984749b897531ec0412e8d2a30"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-20071abfeaa802372d0e656593775f8e7130cb4c10c3dff022ea22b5e719bf77830b2ee89d9998a297422415394ec82b192fc1984749b897531ec0412e8d2a30"' :
                                            'id="xs-components-links-module-AppModule-20071abfeaa802372d0e656593775f8e7130cb4c10c3dff022ea22b5e719bf77830b2ee89d9998a297422415394ec82b192fc1984749b897531ec0412e8d2a30"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HelpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HelpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OddsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OddsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SnapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SnapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpinnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SwitchSvgComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SwitchSvgComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TriggerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TriggerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TriggerSvgComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TriggerSvgComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserFeedbackMessageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserFeedbackMessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WebcamComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WebcamComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/FileTranslateLoader.html" data-type="entity-link" >FileTranslateLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/TvSearchNoResultError.html" data-type="entity-link" >TvSearchNoResultError</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApplicationConfigService.html" data-type="entity-link" >ApplicationConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppStateStore.html" data-type="entity-link" >AppStateStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAnalyticsService.html" data-type="entity-link" >GoogleAnalyticsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImageManipulationService.html" data-type="entity-link" >ImageManipulationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link" >LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MediaDeviceStateStore.html" data-type="entity-link" >MediaDeviceStateStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link" >NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OddsService.html" data-type="entity-link" >OddsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnapOddsFacade.html" data-type="entity-link" >SnapOddsFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TvSearchService.html" data-type="entity-link" >TvSearchService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AccessToken.html" data-type="entity-link" >AccessToken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApplicationConfig.html" data-type="entity-link" >ApplicationConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Competitor.html" data-type="entity-link" >Competitor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LineOdds.html" data-type="entity-link" >LineOdds</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Link.html" data-type="entity-link" >Link</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OddsOffer.html" data-type="entity-link" >OddsOffer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OddsOfferOutcome.html" data-type="entity-link" >OddsOfferOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OddsResponse.html" data-type="entity-link" >OddsResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Player.html" data-type="entity-link" >Player</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Point2d.html" data-type="entity-link" >Point2d</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Quadrangle2d.html" data-type="entity-link" >Quadrangle2d</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SportEvent.html" data-type="entity-link" >SportEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SportsBook.html" data-type="entity-link" >SportsBook</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SportsBook-1.html" data-type="entity-link" >SportsBook</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SportsBookLine.html" data-type="entity-link" >SportsBookLine</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TranslationEntries.html" data-type="entity-link" >TranslationEntries</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TvChannel.html" data-type="entity-link" >TvChannel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TvSearchResult.html" data-type="entity-link" >TvSearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TvSearchResultEntry.html" data-type="entity-link" >TvSearchResultEntry</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});