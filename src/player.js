export let player
export function getUpgradeCost(upgradeName) { return player.upgrades[upgradeName].cost }
export function setUpgradeCost(upgradeName, costIn) { player.upgrades[upgradeName].cost = (costIn) }
export function getUpgradeTimesBought(upgradeName) { return player.upgrades[upgradeName].timesBought }

export function load() {
    if(localStorage.getItem('savefile') == null) {
        player = {
            version: "b1.21.0",
            upgrades: { 
                'gen': { cost: 0, timesBought: 0 },
                'bb': { cost: 2000, timesBought: 0},
                'speed': { cost: 50, timesBought: 0},
                'mbup': { cost: 50, timesBought: 0},
                'mbmult': { cost: 1000, timesBought: 0},
                'unlockgb': { cost: 5000, timesBought: 0},
                'gbupt': { cost: 100, timesBought: 0},
                'gbupm': { cost: 10000, timesBought: 0},
                'nuclearbuy': { cost: 1e6, timesBought: 0},
                'alphaacc': { cost: 1e10, timesBought: 0},
              },
            num: 0,
            gbTimeLeft: 0,
            gbTimeLeftCon: 10,
            gbMult: 1,
            pChunks: 0,
            alphaNum: 0,
            bangTime: 300,
            bangTimeLeft: 1e+300,
            alphaAcceleratorsLeft: 0,
            alphaInc: 1,
            tbCost: 1,
            tbMultiplier: 1,
            perBangMult: 1,
            pbCost: 4,
            eSetting: 1e+4,
            tempBoost: 1,
            bangSpeedCost: 1,
            bangSpeedBought: 0,
            pcaUnlocked: false,
            pcaToggle: true,
            pcaUpCost: 2,
            pcaTime: 160,
            pcaTimeLeft: 0,
            pcaUpBought: 0,
            pcaFracMult: 2,
            autoSaveDelay: 300,
            autoSaveMode: 1,
            autoSaveSet: 300,
            boosterParticles: 0,
            bpPercent: 1,
            bpGainMult: 1,
            untilBoost: 1,
            bpUpCost: 100,
            bpPercentCost: 100,
            themeNumber: 0,
            omegaBase: 0,
            omegaBaseCost: 1e+10,
            omegaAlpha: 0,
            omegaAlphaCost: 1e+12,
            bangAutobuyerUnlocked: false,
            baToggle: true,
            baUpCost: 1,
            baTime: 160,
            baTimeLeft: 0,
            baUpBought: 0,
            baFracMult: 2,
            nuclearAlphaCost: 1e+6,
            napOff: 1,
            gBoostDoubleCost: 1,
            gBoostSquare: 0,
            alphaMachineDoubleCost: 1000,
            alphaMachineMulti: 0,
          };
    }
    else {
        player = JSON.parse(localStorage.getItem('savefile'))
    }
    if(player.version != "b1.21.0") {
        player.version = "b1.21.0";
        alert("This specific version completely breaks compatibility with older saves. Sorry for the inconvenience.");
    }
}