import {Component, OnInit} from 'angular2/core';
import {RouteData, RouteParams} from 'angular2/router';
import {ContentfulService} from 'ng2-contentful/dist/src/services/contentful.service';
import {MarkdownPipe} from '../../shared/pipes/markdown.pipe';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {ContenfulContent} from '../../shared/services/contentful-content.service';
import {NodePageContent} from '../../shared/structures/content-type.structures';

/**
 *
 */
@Component({
  template: <string> require('./about.component.html'),
  directives: [...ROUTER_DIRECTIVES],
  providers: [ContentfulService],
  styles: [<string> require('./about.component.scss')],
  pipes: [MarkdownPipe]
})
export class About implements OnInit {
  private content: NodePageContent;
  private submenuItems: NodePageContent[] = [];

  constructor(private _routerData: RouteData,
              private _params: RouteParams,
              private _contentfulContent: ContenfulContent) {
  }

  ngOnInit(): any {
    let slug = this._params.get('slug') || this._routerData.get('contentfulSlug');
    this._contentfulContent
      .getAboutPage(slug)
      .subscribe(
        response => {
          this.submenuItems = response.submenuItems;
          this.content = response.content;
        },
        error => {
          console.log(error);
        }
      );
    return undefined;
  }
}
