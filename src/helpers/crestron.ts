export const CRESTRON_MAX_ANALOG_SIZE = 65535;

export function percentage(value: number, decimals: number = 0) {
  return ((value / CRESTRON_MAX_ANALOG_SIZE) * 100).toFixed(decimals) + "%";
}

export function sendAnalogValue(id: string, value: number) {
  window.CrComLib.publishEvent("n", id, value);
}
