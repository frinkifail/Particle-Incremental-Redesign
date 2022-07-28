import { format } from './util'
import { player, getUpgradeTimesBought, getUpgradeCost, setUpgradeCost } from './player'


export function UpdateCostVal(elementID, variable, currency = "num") {
    const currencyName = {
        'num': '',
        'alphaNum': ' Alpha',
    }
    document.getElementById(elementID).textContent = "Cost: " + format(variable) + currencyName[currency]
}

export const upgrades = {
    'gen': { multiplier: 4, scaleFunction: scaleGen, costDiv: "divgencost", currency: "num"},
    'bb': {  scaleFunction: scaleMultiplier(2), costDiv: "divbbcost", currency: "num"},
    'speed': {  scaleFunction: scaleSpeed, costDiv: "divspeedcost", currency: "num"},
    'mbup': { scaleFunction: scaleMultiplier(2), costDiv: "divmbupcost", currency: "num"},
    'mbmult': {  scaleFunction: scaleMultiplier(3), costDiv: "divmbmultcost", currency: "num"},
    'unlockgb': {  scaleFunction: scaleMultiplier(Infinity), costDiv: "divgenunlockcost", currency: "num"},
    'gbupt': {  scaleFunction: GBTExtra(scaleMultiplier(5)), costDiv: "divgbuptcost", currency: "num"},
    'gbupm': {  scaleFunction: GBMExtra(5), costDiv: "divgbupmcost", currency: "num"},
    'nuclearbuy': {  scaleFunction: NBExtra(7), costDiv: "divnuclearcost", currency: "num"},
    'alphaacc': {  scaleFunction: AAExtra(1000), costDiv: "divalphaacceleratorcost", currency: "num"},
    'tb': {  scaleFunction: scaleMultiplier(4), costDiv: "divthreeboostcost", currency: "alphaNum"},
    'perbang': {  scaleFunction: scaleMultiplier(4), costDiv: "divperbangcost", currency: "alphaNum"},
}

export function scaleMultiplier(multiplier) {
    return function (upgradeName) {
        setUpgradeCost( upgradeName, getUpgradeCost(upgradeName) * multiplier);
    }
}

export function GBTExtra(scaler) {
    return function (upgradeName) {
       scaler(upgradeName)
       player.gbTimeLeftCon += 20 * Math.pow(2, player.gBoostSquare)
       player.gbTimeLeft = 0
       player.gbTimeLeft = player.gbTimeLeftCon
    }
 }
export function GBMExtra(scaler) {
    return function (upgradeName) {
        scaler(upgradeName)
        player.gbMultCon += 5
        player.gbTimeLeft = 0
        player.gbTimeLeft = player.gbTimeLeftCon
    }
}

export function NBExtra(scaler) {
    return function (upgradeName) {
        scaler(upgradeName)
        document.getElementById("divnp").textContent = "Nuclear Particles: " + getUpgradeTimesBought('nuclearbuy')
    }
}

export function AAExtra(scaler) {
    return function (upgradeName) {
        scaler(upgradeName)
        if(!(player.bangTimeLeft > 0 && player.bangTimeLeft < player.bangTime)) {
            player.alphaAcceleratorsLeft = getUpgradeTimesBought('alphaacc')
        }
    }
}


export function scaleSpeed(upgradeName) {
    if(getUpgradeTimesBought(upgradeName) % 10 == 0) {
        setUpgradeCost(upgradeName, (getUpgradeTimesBought(upgradeName) * 5 + 100))
    }
}

export function scaleGen(upgradeName) {
    if(getUpgradeCost(upgradeName) == 0) {
        setUpgradeCost(upgradeName, 1000)
    }
    else {
        scaleMultiplier(4)(upgradeName) //please sned help AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa
    }
}

window.buyUpgrade = function (upgradeName) {
    const upgrade = upgrades[upgradeName];
    const oldCost = getUpgradeCost(upgradeName);
    if (player[upgrade.currency] >= oldCost) {
        player.upgrades[upgradeName].timesBought++;
        player[upgrade.currency] -= oldCost;
        upgrade.scaleFunction(upgradeName);
        UpdateCostVal(upgrade.costDiv, getUpgradeCost(upgradeName), upgrade.currency);
    }   
}