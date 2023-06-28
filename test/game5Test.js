const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);
    // good luck
    let randWallet;
    let randAddr;
    while(true){
      randWallet  = ethers.Wallet.createRandom();
      randAddr = await randWallet.getAddress();
      if(BigInt(randAddr) < BigInt('0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf')){
        break;
      }
    }
    randWallet = await randWallet.connect(ethers.provider);
    const signer = ethers.provider.getSigner(0);
    const tx = {
      to: randWallet.getAddress(),
      value: ethers.utils.parseEther('1')
    }

    await signer.sendTransaction(tx);

    await game.connect(randWallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
