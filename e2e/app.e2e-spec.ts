import { PlotifyPage } from './app.po';

describe('plotify App', () => {
  let page: PlotifyPage;

  beforeEach(() => {
    page = new PlotifyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
