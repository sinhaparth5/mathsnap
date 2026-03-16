<template>
  <component
    :is="containerComponent"
    :class="containerClass"
    :style="containerStyle"
    v-html="htmlContent"
  />
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { renderMath } from "../core/renderMaths";

export default defineComponent({
  name: "MathEquation",
  emits: ["error"],
  props: {
    equation: {
      type: String,
      required: true,
    },
    displayMode: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
    },
    style: {
      type: Object,
      default: () => ({}),
    },
    katexOptions: {
      type: Object,
      default: () => ({}),
    },
    as: {
      type: String,
      default: null,
      validator: (value: string) => ["div", "span", "p"].includes(value),
    },
  },
  setup(props, { emit }) {
    const containerComponent = computed(() => {
      if (props.as) return props.as;
      return props.displayMode ? "div" : "span";
    });

    const containerClass = computed(() => {
      return {
        "mathsnap-equation": true,
        "mathsnap-display": props.displayMode,
        "mathsnap-inline": !props.displayMode,
        [props.className]: Boolean(props.className),
      };
    });

    const containerStyle = computed(() => {
      return {
        maxWidth: "100%",
        overflowX: "auto",
        display: props.displayMode ? "block" : "inline-block",
        ...props.style,
      };
    });

    const renderResult = computed(() =>
      renderMath({
        equation: props.equation,
        displayMode: props.displayMode,
        katexOptions: props.katexOptions,
      })
    );

    watch(
      () => renderResult.value.error.message,
      (message, previousMessage) => {
        if (renderResult.value.error.hasError && message !== previousMessage) {
          emit("error", new Error(message));
        }
      }
    );

    return {
      htmlContent: computed(() => renderResult.value.html),
      hasError: computed(() => renderResult.value.error.hasError),
      errorMessage: computed(() => renderResult.value.error.message),
      containerComponent,
      containerClass,
      containerStyle,
    };
  },
});
</script>

<style>
.mathsnap-display {
  margin: 1em 0;
}
</style>
