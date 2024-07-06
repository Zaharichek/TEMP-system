import * as mc from "@minecraft/server";
/*this system made and support by Захаричек(Zaharicheck)*/
export class EntityWithPlayer{
    constructor(entity, player){
        this.entity = entity;
        this.player = player;
    }
    movePlayer(interval){
        let playerMove = mc.system.runInterval(() => {
            let entity = this.entity;
            let player = this.player;
            if(!entity.isValid()){
                mc.system.clearRun(playerMove);
                player.clearDynamicProperties();
            }
            let velocityX = entity.getVelocity().x;
            let velocityZ = entity.getVelocity().z;
            mc.system.runTimeout(() => {
                player.setDynamicProperty('savedVelocityX', velocityX);
                player.setDynamicProperty('savedVelocityZ', velocityZ);
                mc.system.runTimeout(() => {
                    player.setDynamicProperty('savedVelocityX1', velocityX);
                    player.setDynamicProperty('savedVelocityZ1', velocityZ);
                    mc.system.runTimeout(() => {
                        player.setDynamicProperty('savedVelocityX2', velocityX);
                        player.setDynamicProperty('savedVelocityZ2', velocityZ);
                    },1);
                },1);
            },1);
            let hS = ((velocityX + player.getDynamicProperty('savedVelocityX') + player.getDynamicProperty('savedVelocityX1') + player.getDynamicProperty('savedVelocityX2')) + (velocityZ + player.getDynamicProperty('savedVelocityZ') + player.getDynamicProperty('savedVelocityZ1') + player.getDynamicProperty('savedVelocityZ2'))) * 1.03915519041 * 1.14673976685;
            let hDx = (velocityX + player.getDynamicProperty('savedVelocityX') + player.getDynamicProperty('savedVelocityX1') + player.getDynamicProperty('savedVelocityX2')) * 1.03915519041 * 1.14673976685;
            let hDz = (velocityZ + player.getDynamicProperty('savedVelocityZ') + player.getDynamicProperty('savedVelocityZ1') + player.getDynamicProperty('savedVelocityZ2')) * 1.03915519041 * 1.14673976685;
            if(velocityX !== 0 && velocityZ !== 0){
                player.applyKnockback(velocityX, 0, Math.abs(hDx * 2), 0);
                player.applyKnockback(0 ,velocityZ, Math.abs(hDz), 0);
            }
            else if(velocityX !== 0 || velocityZ !== 0){
                player.applyKnockback(velocityX, velocityZ, Math.abs(hS), 0);
            }
        },interval);
        this.player.setDynamicProperty('stop', playerMove);     
    }
}
export class EntityWithPlayerStop{
    constructor(player){
        this.player = player;
    }
    stopPlayerMoving(){
        mc.system.clearRun(this.player.getDynamicProperty('stop'));
        this.player.clearDynamicProperties();
    }
}
