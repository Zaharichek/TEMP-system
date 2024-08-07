import * as mc from "@minecraft/server";
import {EntityWithPlayer, EntityWithPlayerStop} from "./lib/system-core";

mc.world.afterEvents.playerInteractWithEntity.subscribe((data) => {
	if(data.itemStack.typeId === 'minecraft:stick'){
		new EntityWithPlayer(data.target, data.player).movePlayer(4);
	}
});
mc.world.afterEvents.itemUse.subscribe((data) => {
	if(data.itemStack.typeId === 'minecraft:wooden_pickaxe'){
		new EntityWithPlayerStop(data.source).stopPlayerMoving();
	}
});
