type itemHeaderProps = {
  name: string
  url: string
}

export class Constants {
  public static readonly privateRoutes: itemHeaderProps[] = [
    {
      name: 'HOME',
      url: '/dashboard',
    },
    {
      name: 'CONTRATTI',
      url: '/contratti',
    },
    {
      name: 'CLIENTI',
      url: '/clienti',
    },
  ]
  public static readonly publicRoutes: itemHeaderProps[] = [
    {
      name: 'Dashboard',
      url: '/',
    },
  ]
}
