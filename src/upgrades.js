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

const scaleMultiplier = (upgradeName) => (upgradeName.cost * upgradeName.multiplier)


export const upgrades = {
    'gen': { multiplier: 4, scaleFunction: scaleGen, costDiv: "divgencost", currency: "Base"},
    'bb': {  multiplier: 2, scaleFunction: scaleMultiplier, costDiv: "divbbcost", currency: "Base"},
    'speed': {  multiplier: 1.5, scaleFunction: scaleSpeed, costDiv: "divspeedcost", currency: "Base"},
    'mbup': {  multiplier: 2, scaleFunction: scaleMultiplier, costDiv: "divmbupcost", currency: "Base"},
    'mbmult': {  multiplier: 3, scaleFunction: scaleMultiplier, costDiv: "divmbmultcost", currency: "Base"},
}

/*function buyspeed() {
if(player.num >= (player.speedCost * player.supScale)) {
    player.num -= (player.speedCost * player.supScale)
    if(player.supBought % 10 == 0) {
        player.supScale += 1
    }
    player.supBought++
    player.intervalSpeed = 1000 / player.fracMult
    player.fracMult++
    document.getElementById("divspeedcost").textContent = "Cost: " + format(player.speedCost * player.supScale)
}
}*/

export function scaleSpeed(upgradeName) {
    const upgrade = upgrades[upgradeName];
    if(getUpgradeTimesBought(upgradeName) % 10 == 0) {
        upgrade.multipler *= 1 //placeholder
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

export function buyUpgrade(upgradeName) {
    const upgrade = upgrades[upgradeName];
    const oldCost = getUpgradeCost(upgradeName);
    if (player.num >= oldCost) {
        player.upgrades[upgradeName].timesBought++;
        player.num -= oldCost;
        upgrade.scaleFunction(upgradeName);
        UpdateCostVal(upgrade.costDiv, getUpgradeCost(upgradeName), upgrade.currency);
    }   
}