import { Component, Vue } from "vue-property-decorator";
import WithRender from "./upload.html?style=./upload.scss";

@Component
@WithRender
class UploadDialogComponent extends Vue {
    
}

export { UploadDialogComponent };