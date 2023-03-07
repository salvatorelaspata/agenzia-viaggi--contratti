type itemHeaderProps = {
  name: string
  url: string
}

export class Constants {
  public static readonly privateRoutes: itemHeaderProps[] = [
    {
      name: 'CONTRATTI',
      url: '/contracts',
    },
    {
      name: 'CLIENTI',
      url: '/catalogs',
    },
  ]
  public static readonly publicRoutes: itemHeaderProps[] = [
    {
      name: 'Dashboard',
      url: '/',
    },
  ]
}
