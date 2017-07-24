import { PlayersPage } from './app.po';

describe('players App', () => {
  let page: PlayersPage;

  beforeEach(() => {
    page = new PlayersPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
