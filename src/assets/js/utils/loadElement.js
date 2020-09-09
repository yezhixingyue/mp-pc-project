import Vue from 'vue';

import {
  Dialog, Dropdown, DropdownMenu, DropdownItem, Select, Option,
  Tabs, TabPane, Message, Input, Form, FormItem, Button, CheckboxGroup, Checkbox,
} from 'element-ui';

Vue.use(Select);
Vue.use(Option);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Dialog);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);

Vue.prototype.$message = Message;

// Vue.use(Element);
