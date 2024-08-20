import * as mc from "@minecraft/server";
/*this system made and support by Захаричек(Zaharicheck)*/
export class EntityWithPlayer{
    constructor(entity, player){
        this.entity = entity;
        this.player = player;
    }
    movePlayer(interval){
        let playerSeat = this.player.dimension.spawnEntity('temp_system:player_seat', this.player.location);
        playerSeat.getComponent('minecraft:rideable').addRider(this.player);
        let playerMove = mc.system.runInterval(() => {
            let entity = (this.entity.getComponent("minecraft:riding") != undefined && this.entity.getComponent("minecraft:riding").entityRidingOn != undefined)? this.entity.getComponent("minecraft:riding").entityRidingOn:
            this.entity;
            let player = this.player;
            if(!entity.isValid()){
                mc.system.clearRun(playerMove);
                player.clearDynamicProperties();
            }
            playerSeat.clearVelocity();
            playerSeat.applyImpulse(entity.getVelocity());
        },interval);
        this.player.setDynamicProperty('stop', playerMove);
        this.player.setDynamicProperty('entityRemove', playerSeat.id);     
    }
}
export class EntityWithPlayerStop{
    constructor(player){
        this.player = player;
    }
    stopPlayerMoving(){
        mc.system.clearRun(this.player.getDynamicProperty('stop'));
        if(mc.world.getEntity(this.player.getDynamicProperty('entityRemove')).isValid()){
            mc.world.getEntity(this.player.getDynamicProperty('entityRemove')).getComponent('minecraft:rideable').ejectRiders();
            mc.world.getEntity(this.player.getDynamicProperty('entityRemove')).remove();
        }
        this.player.clearDynamicProperties();
    }
}
