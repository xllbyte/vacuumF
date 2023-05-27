import { requestFinal } from '@/service/request/init';

export function queryHeatValue() {
  return requestFinal.get<string>(`/param/queryHeat`);
}

export function updateHeatParam(key: string) {
  return requestFinal.post<string>(`/param/heatSave?param=${key}`);
}

export function getSum() {
  return requestFinal.get<number>(`/count/querySumCount`);
}

export function queryHeatCompensation() {
  return requestFinal.get<object>(`/param/queryAllParam`);
}

export function updateTimeInterval(key: string) {
  return requestFinal.post<string>(`/param/updateTimeInterval?number=${key}`);
}

export function queryAllProduct() {
  return requestFinal.get<object>(`/product/queryAllProduct`);
}

export function queryStoveLength() {
  return requestFinal.post<object>(`/param/queryStoveLength`);
}
