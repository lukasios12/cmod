import { Component, Vue } from "vue-property-decorator";
import WithRender from "./welcome.html?style=./welcome.scss";

import { AxiosResponse } from "axios";

import UserService from "src/services/user-service";
import SessionService from "src/services/session-service";
import { UserCreated } from "src/response-types/user";
import { ErrorResponse } from "src/response-types/error";

@Component({
    name: "welcome"
})
@WithRender
export default class WelcomeDialogComponent extends Vue {
    title: string = "Welcome"
    username: string = ""

    send() {
        let service = UserService.getInstance();
        service.set(this.username)
            .then( (response: AxiosResponse<UserCreated>) => {
                let id = response.data.id;
                SessionService.getInstance().userId = Number(id);
            })
            .catch( (response: AxiosResponse<ErrorResponse>) => {
                console.warn(response.request.responseText);
            });
    }
}