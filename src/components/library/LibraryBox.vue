<template>
    <div class="container-fluid libraryBox boite">
        <div class="row text-center rowBtnAddPicture">
            <button type="button" @click="showModalAddPicture" class="btn btn-primary btnAddPicture col-sm-12 col-md-3 offset-md-9 col-lg-2 offset-lg-10">Ajouter une photo</button>
        </div>
        <div class="row">
            <div class="pictureBox col-sm-12 col-md-3 col-lg-2" v-for="picture in picturesUser">
                <PictureBox :picture="picture"></PictureBox>
            </div>
        </div>
        <ModalAddPicture></ModalAddPicture>
    </div>
</template>

<script>
    import PictureBox from "./PictureBox";
    import ModalAddPicture from "./ModalAddPicture/ModalAddPicture";
    export default {
        name: "LibraryBox",
        components: {ModalAddPicture, PictureBox},
        beforeDestroy() {
            this.$bus.$off();
        },
        mounted(){
            this.getAllPicturesUser();
        },
        data(){
            return{
                picturesUser:[]
            }
        },
        methods:{
            getAllPicturesUser(){
                this.$axios.get("pictures", {
                    headers: {Authorization: 'Bearer ' + this.$store.state.user.token}
                }).then((response) => {
                    console.log("Récupération des photos réussie")
                    this.picturesUser = response.data.pictures
                }).catch(error => {
                    console.log("Erreur lors de la récupération des photos")
                    this.$root.makeToast("Erreur lors de la récupération des photos")
                })
            },
            showModalAddPicture(){
                this.$bvModal.show("modal-addpicture");
            }
        }
    }
</script>

<style scoped>
    .boite{
        overflow: hidden;

    }
    .btn{
        margin-top: 3em;
    }
    .rowBtnAddPicture{
        margin: 1em 1em 0 1em;
    }
</style>