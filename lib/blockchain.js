
const params = {
  LAST_POW_BLOCK: 500, // 345600
  RAMP_TO_BLOCK: 500,
  LAST_SEESAW_BLOCK: 500
};

const avgBlockTime = 90; // 1.5 minutes (90 seconds)

const blocksPerDay = (24 * 60 * 60) / avgBlockTime; // 960

const blocksPerWeek = blocksPerDay * 7; // 6720

const blocksPerMonth = (blocksPerDay * 365.25) / 12; // 29220

const blocksPerYear = blocksPerDay * 365.25; // 350640

const mncoins = 1100.0;

const getMNBlocksPerDay = (mns) => {
  return blocksPerDay / mns;
};

const getMNBlocksPerWeek = (mns) => {
  return getMNBlocksPerDay(mns) * (365.25 / 52);
};

const getMNBlocksPerMonth = (mns) => {
  return getMNBlocksPerDay(mns) * (365.25 / 12);
};

const getMNBlocksPerYear = (mns) => {
  return getMNBlocksPerDay(mns) * 365.25;
};

const getMNSubsidy = (nHeight = 0, nMasternodeCount = 0, nMoneySupply = 0) => {
  const blockValue = getSubsidy(nHeight);
  left ret = 0;
  if (nHeight <= 1) {
    ret = blockValue  / 100 * 0;
  } else if (nHeight > 100 ) {
    ret = blockValue / 100 * 75;
  }
  
  return ret;
};

const getSubsidy = (nHeight = 1) => {
  let nSubsidy = 0.0;

  if (nHeight == 1) {
    nSubsidy = 65000 * COIN;
  } else if (nHeight <= 500 && nHeight > 1) {
    nSubsidy = 1 * COIN;
  } else if (nHeight <= 15000 && nHeight > 500) {
    nSubsidy = 1 * COIN;
  } else if (nHeight <= 30000 && nHeight > 15000) {
    nSubsidy = 15 * COIN;
  } else if (nHeight <= 60000 && nHeight > 30000) {
    nSubsidy = 22 * COIN;
  } else if (nHeight <= 120000 && nHeight > 60000) {
    nSubsidy = 33 * COIN;
  } else if (nHeight <= 240000 && nHeight > 120000) {
    nSubsidy = 50 * COIN;
  } else if (nHeight <= 480000 && nHeight > 240000) {
    nSubsidy = 75 * COIN;
  } else if (nHeight <= 960000 && nHeight > 480000) {
    nSubsidy = 110 * COIN;
  } else if (nHeight <= 1920000 && nHeight > 960000) {
    nSubsidy = 165 * COIN;
  } else if (nHeight <= 3840000 && nHeight > 1920000) {
    nSubsidy = 250 * COIN;
  } else if (nHeight <= 7680000 && nHeight > 3840000) {
    nSubsidy = 350 * COIN;
  } else if (nHeight <= 15360000 && nHeight > 7680000) {
    nSubsidy = 120 * COIN;
  } else if (nHeight <= 30720000 && nHeight > 15360000) {
    nSubsidy = 150 * COIN;
  } else if (nHeight <= 61440000 && nHeight > 30720000) {
    nSubsidy = 75 * COIN;
  } else if (nHeight <= 122880000 && nHeight > 61440000) {
    nSubsidy = 50 * COIN;
  } else if (nHeight <= 245760000 && nHeight > 122880000) {
    nSubsidy = 10 * COIN;
  } else if (nHeight > 245760000) {
    nSubsidy = 5 * COIN;
  }

  return nSubsidy;
};

const getROI = (subsidy, mns) => {
  return ((getMNBlocksPerYear(mns) * subsidy) / mncoins) * 100.0;
};

const isAddress = (s) => {
  return typeof(s) === 'string' && s.length === 34;
};

const isBlock = (s) => {
  return !isNaN(s) || (typeof(s) === 'string');
};

const isPoS = (b) => {
  return !!b && b.height > params.LAST_POW_BLOCK; // > 182700
};

const isTX = (s) => {
  return typeof(s) === 'string' && s.length === 64;
};

module.exports = {
  avgBlockTime,
  blocksPerDay,
  blocksPerMonth,
  blocksPerWeek,
  blocksPerYear,
  mncoins,
  params,
  getMNBlocksPerDay,
  getMNBlocksPerMonth,
  getMNBlocksPerWeek,
  getMNBlocksPerYear,
  getMNSubsidy,
  getSubsidy,
  getROI,
  isAddress,
  isBlock,
  isPoS,
  isTX
};
