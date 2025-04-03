import * as mc from "@minecraft/server";
/*this system made and support by Захаричек(Zaharicheck)*/
/*credits to Sonichec0*/
export class EntityWithPlayer{
    constructor(player, entity = undefined){
        this.entity = entity;
        this.player = player;
    }
    
    movePlayer(interval){
        this.player.inputPermissions.setPermissionCategory(6, false);
        this.player.inputPermissions.setPermissionCategory(7, false);
        this.player.inputPermissions.setPermissionCategory(8, false);

        let playerSeat = this.player.dimension.spawnEntity('temp_system:player_seat', this.player.location);
        playerSeat.getComponent('minecraft:rideable').addRider(this.player);
        
        let playerMove = mc.system.runInterval(() => {
            let entity = this.entity;
            let player = this.player;
            if(!entity?.isValid() || !player?.isValid()){
                player?.setDynamicProperty('sonichec_zaharichek_temp_system', undefined);
                player?.inputPermissions.setPermissionCategory(6, true);
                player?.inputPermissions.setPermissionCategory(7, true);
                player?.inputPermissions.setPermissionCategory(8, true);

                playerSeat?.remove();
                mc.system.clearRun(playerMove);
                return;
            }

            playerSeat.clearVelocity();
            playerSeat.applyImpulse(entity.getVelocity())
        },interval);

        this.player.setDynamicProperty('sonichec_zaharichek_temp_system', JSON.stringify([playerMove, playerSeat.id])); 
    }
    
    stopPlayerMoving(){
        let property = this.player.getDynamicProperty('sonichec_zaharichek_temp_system');
        if(!property) return;
        property = JSON.parse(property);
        mc.system.clearRun(property[0]);
        let seat = mc.world.getEntity(property[1]);

        if(seat?.isValid()){
            seat.getComponent('minecraft:rideable').ejectRiders();
            seat.remove();
        }
        this.player.setDynamicProperty('sonichec_zaharichek_temp_system', undefined);
        this.player.inputPermissions.setPermissionCategory(6, true);
        this.player.inputPermissions.setPermissionCategory(7, true);
        this.player.inputPermissions.setPermissionCategory(8, true);
    }
}