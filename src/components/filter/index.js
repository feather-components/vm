import Single from './single';
import Multiple from './multiple';
import Link from './link';
import LinkMultiple from './link-multiple';

import {Util} from '../../helper';
Util.register(Single);
Util.register(Link);

export {
    Single,
    Multiple,
    Link,
    LinkMultiple
}