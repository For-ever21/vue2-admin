import { VuexModule, Module, Mutation, Action, getModule } from "vuex-module-decorators";
import { Route } from "vue-router";
import store from "@/store";

export interface ITagView extends Partial<Route> {
  title?: string;
}

export interface ITagsViewState {
  visitedViews?: ITagView[];
  cachedViews?: any[];
}

const NAME = "tagsView";

@Module({ dynamic: true, store, name: NAME })
class TagsView extends VuexModule implements ITagsViewState {
  public visitedViews: ITagView[] = [];
  public cachedViews: any[] = [];

  @Mutation
  private commitAddVistedView(view: ITagView) {
    if (this.visitedViews.some((v: any) => v.path === view.path)) return;
    this.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || "no-name"
      })
    );
  }

  @Mutation
  private commitAddCachedView(view: ITagView) {
    if (this.cachedViews.includes(view.name as any)) return;
    if (!view.meta.noCache) {
      this.cachedViews.push(view.name);
    }
  }

  @Mutation
  private commitDelVisitedView(view: ITagView) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1);
        break;
      }
    }
  }

  @Mutation
  private commitDelCachedView(view: ITagView) {
    for (const [i, v] of this.cachedViews.entries()) {
      if (v === view.name) {
        this.cachedViews.splice(i, 1);
        break;
      }
    }
  }

  @Mutation
  private commitDelOthersVisitedViews(view: ITagView) {
    this.visitedViews = this.visitedViews.filter((v) => {
      return v.meta.affix || v.path === view.path;
    });
  }

  @Mutation
  private commitDelOthersCachedViews(view: ITagView) {
    for (const [i, v] of this.cachedViews.entries()) {
      if (v === view.name) {
        this.cachedViews = this.cachedViews.slice(i, i + 1);
        break;
      }
    }
  }

  @Mutation
  private commitDelAllVisitedViews() {
    // keep affix tags
    const affixTags = this.visitedViews.filter((tag) => tag.meta.affix);
    this.visitedViews = affixTags;
  }

  @Mutation
  private commitDelAllCachedViews() {
    this.cachedViews = [];
  }

  @Mutation
  private commitUpdateVisitedView(view: ITagView) {
    for (let v of this.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  }

  @Action
  public addViewAction(view: ITagView) {
    this.addVisitedViewAction(view);
    this.addCachedViewAction(view);
  }

  @Action
  public addVisitedViewAction(view: ITagView) {
    this.commitAddVistedView(view);
  }

  @Action({ rawError: true })
  public addCachedViewAction(view: ITagView) {
    this.commitAddCachedView(view);
  }

  @Action
  public delViewAction(view: ITagView): Promise<ITagsViewState> {
    return new Promise((resolve) => {
      this.delVisitedViewAction(view);
      this.delCachedViewAction(view);
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      });
    });
  }

  @Action
  public delVisitedViewAction(view: ITagView): Promise<ITagsViewState> {
    return new Promise((resolve) => {
      this.commitDelVisitedView(view);
      resolve({
        visitedViews: [...this.visitedViews]
      });
    });
  }

  @Action
  public delCachedViewAction(view: ITagView): Promise<ITagsViewState> {
    return new Promise((resolve) => {
      this.commitDelCachedView(view);
      resolve({
        visitedViews: [...this.cachedViews]
      });
    });
  }

  @Action
  public delOthersViewsAction(view: ITagView): Promise<ITagsViewState> {
    return new Promise((resolve) => {
      this.delOthersVisitedViewsAction(view);
      this.delOthersCachedViewsAction(view);
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      });
    });
  }

  @Action
  public delOthersVisitedViewsAction(view: ITagView): Promise<ITagsViewState> {
    return new Promise((resolve) => {
      this.commitDelOthersVisitedViews(view);
      resolve({
        visitedViews: [...this.visitedViews]
      });
    });
  }

  @Action
  public delOthersCachedViewsAction(view: ITagView): Promise<ITagsViewState> {
    return new Promise((resolve) => {
      this.commitDelOthersCachedViews(view);
      resolve({
        cachedViews: [...this.cachedViews]
      });
    });
  }

  @Action
  public delAllViewsAction(): Promise<ITagsViewState> {
    return new Promise((resolve) => {
      this.delAllVisitedViewsAction();
      this.delAllCachedViewsAction();
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      });
    });
  }

  @Action
  public delAllVisitedViewsAction(): Promise<ITagsViewState> {
    return new Promise((resolve) => {
      this.commitDelAllVisitedViews();
      resolve({
        visitedViews: [...this.visitedViews]
      });
    });
  }

  @Action
  public delAllCachedViewsAction(): Promise<ITagsViewState> {
    return new Promise((resolve) => {
      this.commitDelAllCachedViews();
      resolve({
        cachedViews: [...this.cachedViews]
      });
    });
  }

  @Action
  public updateVisitedViewAction(view: ITagView) {
    this.commitUpdateVisitedView(view);
  }
}

export const tagsViewStore = getModule(TagsView);
