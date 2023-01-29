import { makeAutoObservable } from 'mobx';
import { ServerError } from './../models/serverError';
export default class CommonStore {
  error: ServerError | null = null;
  construtor() {
    makeAutoObservable(this);
  }
  setServerError(error: ServerError){
    this.error = error;
  }
}
