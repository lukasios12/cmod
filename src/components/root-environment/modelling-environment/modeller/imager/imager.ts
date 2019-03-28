import { AxiosResponse, AxiosError } from "axios";
import { Vue, Component } from "vue-property-decorator";
import WithRender from "./imager.html?style=./imager.scss";

import Loader from "src/components/common/loader/loader";

import { getModule } from "vuex-module-decorators";
import UserModule from "src/store/user";
import PetrinetService from "src/services/petrinet";

@WithRender
@Component({
    name: "imager",
    components: {
        "loader": Loader
    }
})
export default class Imager extends Vue {
    image: SVGElement | null = null;
    error: string | null = null;
    loading: boolean = false;

    mounted() {
        let mod = getModule(UserModule, this.$store);
        if (mod.petrinetId !== null) {
            this.loading = true;
            PetrinetService.image(mod.petrinetId).then((response: AxiosResponse<string>) => {
                let parser = new DOMParser();
                let el = parser.parseFromString(response.data, "image/svg+xml");
                let svg = <SVGElement><unknown>el.documentElement;
                this.image = svg;
            }).catch((response: AxiosError) => {
                this.error = response.message;
            }).finally(() => {
                this.loading = false;
            });
        } else {
            this.error = "Not enough information to retrieve image";
        }
    }
}
