<template>
    <div class="hd-title padding-3 d-flex align-items-center" :class="positionSyle">
        <div class="text-size-default font-weight-bold" :style="textStyle">
            <slot name="default"></slot>
        </div>
        <div class="text-size-md text-666">
            <slot name="desc"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        exec: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: 'left'
        }
    },
    computed: {
        textStyle () {
            if (this.exec) {
                return {
                    'border-left': '5px solid #07c160',
                    'padding-left': '10px'
                }
            }
            return {}
        },
        positionSyle () {
            let style = 'justify-content-between'
            if (this.position === 'center') {
                style = 'justify-content-center'
            } else if (this.position === 'right') {
                style = 'justify-content-end'
            }
            return style
        }
    }
}
</script>
