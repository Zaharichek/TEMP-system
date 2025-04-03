import * as mc from "@minecraft/server";
import {EntityWithPlayer} from "./lib/system-core";

mc.world.beforeEvents.playerInteractWithEntity.subscribe((data) => {
	if(data.itemStack.typeId === 'minecraft:stick'){
		mc.system.run(() => {new EntityWithPlayer(data.player, data.target).movePlayer(1);})
	}
});
mc.world.afterEvents.itemUse.subscribe((data) => {
	if(data.itemStack.typeId === 'minecraft:wooden_pickaxe'){
		new EntityWithPlayer(data.source).stopPlayerMoving();
	}
});