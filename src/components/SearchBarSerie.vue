<template>
    <v-select :options="series" label="city" placeholder="Choisissez une série" @input="selectedSerieChange" />
</template>

<script>
    import vSelect from 'vue-select'
    export default {
        name: "SearchBarSerie",
        components:{
            vSelect
        },
        data(){
            return{
                selectedSerie:null,
                series:[]
            }
        },
        beforeDestroy() {
            this.$bus.$off();
        },
        mounted() {
            this.$axios.get("series", {
                headers: {Authorization: 'Bearer ' + this.$store.state.user.token}
            }).then((response) => {
                this.series = response.data.series
                console.log("Chargement des séries réussie");
            }).catch(error => {
                console.log("Erreur lors du chargement des series")
                this.$root.makeToast("Erreur lors du chargement des series")
            })
        },
        methods:{
            selectedSerieChange(serie){
                this.$bus.$emit('selectedSerieChange', serie);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../node_modules/vue-select/dist/vue-select.css";

    .v-select{
        background-color: white;
    }
</style>