<script>
import Vue from 'vue';
import Overlay from '../overlay';
import Shade from '../shade';
import Factory from '../factory';

var instance;

var ActionSheet = (actions) => {
    instance && instance.close();

    return instance = Factory({
        mixins: [Overlay],
        template: ActionSheet.template,
        components: {
            Shade,
            Overlay
        },
        data: {
            visibility: true,
            actions
        },
        methods: {
            callAction(index){
                var action = this.actions[index];

                if(typeof action == 'function'){
                    action.call(this);
                }else{
                    action.callback.call(this);
                }

                this.close();
            }
        }
    });
}

export default ActionSheet;