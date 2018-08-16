import { homify } from "@/index";
import { XiaomiGenericSwitch } from "./_switch"
import { createDebug } from "services/debug.service";

const log = createDebug("Platform:switch:xiaomi_aqara");

export const setup_platform = (device) => {
  log('Connected ', device.miioModel);
  if (device.miioModel === "lumi.ctrl_neutral2") {
    for (const childSwitch of device.children()) {
      const component = new XiaomiWallSwitch(childSwitch);
      homify.add_component(component);
    }
  }
}
class XiaomiWallSwitch extends XiaomiGenericSwitch {
  entity_id: string;
  name: string;
  available: boolean;
  constructor(_device) {
    super(_device);
    this.entity_id = _device.id;
    this.available = true;
    this.name = "Wall Switch";
    // this.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSah187ddN15p9mx63JUb13w6_F0AzlUKVfJ9-JWwakmuCMLv";
    this.icon = "device/lightbulb";
  }
}