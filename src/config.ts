export const config = {
  appUrl: 'https://app.elisym.network',
  payCoreUrl: 'https://paycore.elisym.network',
  payAdminUrl: 'https://admin.elisym.network',
  commerceDocsUrl: 'https://docs.elisym.network/commerce/quickstart',
  docsUrl: 'https://docs.elisym.network/',
  githubUrl: 'https://github.com/elisymlabs/elisym',
  providerGuideUrl: 'https://docs.elisym.network/providers/quickstart',
  twitterUrl: 'https://twitter.com/elisymlabs',
  telegramUrl: 'https://t.me/elisymlabs',
  siteUrl: 'https://elisym.network',

  // $LSM token (pump.fun). Replace `tokenMint` with the real mint address once
  // the launch is live - it drives both the Buy link and the copyable contract.
  tokenTicker: 'LSM',
  tokenMint: '86T4G3zJaBxQAuWAbfXggE5d5XEt4bns3Y41jgVLpump',
  pumpFunBaseUrl: 'https://pump.fun',
  dexscreenerUrl:
    'https://dexscreener.com/solana/by2fcuns53nduzcxcahffxqpf9t1cv2mjaczqy6ymcay',
  tokenTelegramUrl: 'https://t.me/elisymlabs',
} as const;
