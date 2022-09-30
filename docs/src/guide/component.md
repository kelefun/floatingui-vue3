# Component

For more advanced use cases such as dropdowns, you can use the components instead of the `v-tooltip` directive.

## Dropdown

The most basic component included by default is the `VDropdown` component:

```vue
<VDropdown
  :distance="6"
>
  <!-- This will be the popover reference (for the events and position) -->
  <button>Click me</button>

  <!-- This will be the content of the popover -->
  <template #popper>
    <input class="tooltip-content" v-model="msg" placeholder="Tooltip content" />
    <p>
      {{ msg }}
    </p>

    <!-- You can put other components too -->
    <ExampleComponent char="=" />
  </template>
</VDropdown>
```
