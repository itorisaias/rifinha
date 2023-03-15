import { ApplicationException } from "~/utils/application.exception";

export class EmailExistException extends ApplicationException {
  constructor(email: string) {
    super(`e-mail ${email} already exist`, 400);
  }
}
