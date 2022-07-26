import { format } from './util'
import { player, getUpgradeTimesBought, getUpgradeCost, setUpgradeCost } from './player'


export function UpdateCostVal(elementID, variable, currency = "Base") {
    if(currency == "Base") {
    document.getElementById(elementID).textContent = "Cost: " + format(variable)
    }
    else{
        document.getElementById(elementID).textContent = "Cost: " + format(variable) + currency
    }
}

export const upgrades = {
    'gen': { multiplier: 4, scaleFunction: scaleGen, costDiv: "divgencost", currency: "Base"},
    'bb': {  multiplier: 2, scaleFunction: scaleMultiplier, costDiv: "divbbcost", currency: "Base"},
    'speed': {  multiplier: NaN, scaleFunction: scaleSpeed, costDiv: "divspeedcost", currency: "Base"},
    'mbup': {  multiplier: 2, scaleFunction: scaleMultiplier, costDiv: "divmbupcost", currency: "Base"},
    'mbmult': {  multiplier: 3, scaleFunction: scaleMultiplier, costDiv: "divmbmultcost", currency: "Base"},
    'unlockgb': {  multiplier: Infinity, scaleFunction: scaleMultiplier, costDiv: "divgenunlockcost", currency: "Base"},
    'gbupt': {  multiplier: 5, scaleFunction: GBExtraExecT, costDiv: "divgbuptcost", currency: "Base"},
    'gbupm': {  multiplier: 5, scaleFunction: GBExtraExecM, costDiv: "divgbupmcost", currency: "Base"},
}

export function scaleMultiplier(upgradeName) {
    const upgrade = upgrades[upgradeName];
    setUpgradeCost(upgradeName, (getUpgradeCost(upgradeName) * upgrade.multiplier))
}
export function GBExtraExecT(upgradeName) {
    scaleMultiplier(upgradeName)
    player.gbTimeLeftCon += 20 * Math.pow(2, player.gBoostSquare)
    player.gbTimeLeft = 0
    player.gbTimeLeft = player.gbTimeLeftCon
}
export function GBExtraExecM(upgradeName) {
    scaleMultiplier(upgradeName)
    player.gbMultCon += 5
    player.gbTimeLeft = 0
    player.gbTimeLeft = player.gbTimeLeftCon
}

export function scaleSpeed(upgradeName) {
    if(getUpgradeTimesBought(upgradeName) % 10 == 0) {
        setUpgradeCost(upgradeName, (getUpgradeTimesBought(upgradeName) * 5 + 100))
    }
}

export function scaleGen(upgradeName) {
    const upgrade = upgrades[upgradeName];
    if(getUpgradeCost(upgradeName) == 0) {
        setUpgradeCost(upgradeName, 1000)
    }
    else {
        setUpgradeCost(upgradeName, (getUpgradeCost(upgradeName) * upgrade.multiplier))
    }
}

window.buyUpgrade = function (upgradeName) {
    const upgrade = upgrades[upgradeName];
    const oldCost = getUpgradeCost(upgradeName);
    if (player.num >= oldCost) {
        player.upgrades[upgradeName].timesBought++;
        player.num -= oldCost;
        upgrade.scaleFunction(upgradeName);
        UpdateCostVal(upgrade.costDiv, getUpgradeCost(upgradeName), upgrade.currency);
    }   
}