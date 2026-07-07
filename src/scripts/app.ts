import { onPageLoad, startLifecycle } from './lifecycle';
import { initScroll } from './scroll';
import { initNavbar } from './navbar';
import { initCursor } from './cursor';

onPageLoad(initScroll);
onPageLoad(initNavbar);
onPageLoad(initCursor);

startLifecycle();
