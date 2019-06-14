import Single from './single';
import Multiple from './multiple';
import Link from './link';
import LinkMultiple from './link-multiple';

import {Util} from '../../helper';
Util.register(Single);
Util.register(Multiple);
Util.register(Link);
Util.register(LinkMultiple);

export {
    Single,
    Multiple,
    Link,
    LinkMultiple
};

export default {
    Single,
    Multiple,
    Link,
    LinkMultiple
};