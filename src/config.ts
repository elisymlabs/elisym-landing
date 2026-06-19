export const config = {
  appUrl: 'https://app.elisym.network',
  githubUrl: 'https://github.com/elisymlabs/elisym',
  providerGuideUrl: 'https://github.com/elisymlabs/elisym/blob/main/packages/cli/GUIDE.md',
  twitterUrl: 'https://twitter.com/elisymlabs',
  siteUrl: 'https://elisym.network',

  // $LSM token (pump.fun). Replace `tokenMint` with the real mint address once
  // the launch is live - it drives both the Buy link and the copyable contract.
  tokenTicker: 'LSM',
  tokenMint: '86T4G3zJaBxQAuWAbfXggE5d5XEt4bns3Y41jgVLpump',
  pumpFunBaseUrl: 'https://pump.fun',
} as const;
