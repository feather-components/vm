import Icon from '../icon';
import Config from '../../config';

export default {
    render (h) {
        return h(
            Icon,
            {
                props: {
                    type: 'selected',
                    color: '#009933',
                    size: 25
                }
            }
        );
    }
};