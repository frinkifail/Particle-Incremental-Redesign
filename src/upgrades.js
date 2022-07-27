import { format } from './util'
import { player, getUpgradeTimesBought, getUpgradeCost, setUpgradeCost } from './player'


export function UpdateCostVal(elementID, variable, currency = "Base") {
    if(currency == "Base") {
    document.getElementById(elementID).textContent = "Cost: " + format(variable)
    }
    else{
        document.getElementById(elementID).textContent = "Cost: " + format(variable) + " " + currency
    }
}

export const upgrades = {
    'gen': { multiplier: 4, scaleFunction: scaleGen, costDiv: "divgencost", currency: "Base"},
    'bb': {  multiplier: 2, scaleFunction: scaleMultiplier, costDiv: "divbbcost", currency: "Base"},
    'speed': {  multiplier: NaN, scaleFunction: scaleSpeed, costDiv: "divspeedcost", currency: "Base"},
    'mbup': {  multiplier: 2, scaleFunction: scaleMultiplier, costDiv: "divmbupcost", currency: "Base"},
    'mbmult': {  multiplier: 3, scaleFunction: scaleMultiplier, costDiv: "divmbmultcost", currency: "Base"},
    'unlockgb': {  multiplier: Infinity, scaleFunction: scaleMultiplier, costDiv: "divgenunlockcost", currency: "Base"},
    'gbupt': {  multiplier: 5, scaleFunction: GBTExtra, costDiv: "divgbuptcost", currency: "Base"},
    'gbupm': {  multiplier: 5, scaleFunction: GBMExtra, costDiv: "divgbupmcost", currency: "Base"},
    'nuclearbuy': {  multiplier: 7, scaleFunction: NBExtra, costDiv: "divnuclearcost", currency: "Base"},
    'alphaacc': {  multiplier: 1000, scaleFunction: AAExtra, costDiv: "divalphaacceleratorcost", currency: "Base"},
    'tb': {  multiplier: 4, scaleFunction: scaleMultiplier, costDiv: "divthreeboostcost", currency: "Alpha"},
}

export function scaleMultiplier(upgradeName) {
    const upgrade = upgrades[upgradeName];
    setUpgradeCost(upgradeName, (getUpgradeCost(upgradeName) * upgrade.multiplier))
}

export function GBTExtra(upgradeName) {
    scaleMultiplier(upgradeName)
    player.gbTimeLeftCon += 20 * Math.pow(2, player.gBoostSquare)
    player.gbTimeLeft = 0
    player.gbTimeLeft = player.gbTimeLeftCon
}
export function GBMExtra(upgradeName) {
    scaleMultiplier(upgradeName)
    player.gbMultCon += 5
    player.gbTimeLeft = 0
    player.gbTimeLeft = player.gbTimeLeftCon
}

export function NBExtra(upgradeName) {
    scaleMultiplier(upgradeName)
    document.getElementById("divnp").textContent = "Nuclear Particles: " + getUpgradeTimesBought('nuclearbuy')
}

export function AAExtra(upgradeName) {
    scaleMultiplier(upgradeName)
    if(!(player.bangTimeLeft > 0 && player.bangTimeLeft < player.bangTime)) {
        player.alphaAcceleratorsLeft = getUpgradeTimesBought('alphaacc')
    }
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

function currencyConverter(curr) {
    switch(curr) {
        case "Base":
            return 'num'
        case "Alpha":
            return 'alphaNum'
    }
}

window.buyUpgrade = function (upgradeName) {
    const upgrade = upgrades[upgradeName];
    const oldCost = getUpgradeCost(upgradeName);
    const cCurr = currencyConverter(upgrade.currency)
    if (player[cCurr] >= oldCost) {
        player.upgrades[upgradeName].timesBought++;
        player[cCurr] -= oldCost;
        upgrade.scaleFunction(upgradeName);
        UpdateCostVal(upgrade.costDiv, getUpgradeCost(upgradeName), upgrade.currency);
    }   
}