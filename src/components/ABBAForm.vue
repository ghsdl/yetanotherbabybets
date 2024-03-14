<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const required = { required_error: 'Veuillez renseigner ce champ' };

const validationSchema = toTypedSchema(
  z.object({
    firstname: z.string(required),
    lastname: z.string(required),
    deliveryDate: z.string(required).transform((str) => new Date(str)),
    gender: z.string(required),
    weight: z.number(required),
    height: z.number(required),
    babyName: z.string(required)
  })
);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema
});

const firstname = useField('firstname');
const lastname = useField('lastname');
const deliveryDate = useField('deliveryDate');
const gender = useField('gender');
const weight = useField('weight');
const height = useField('height');
const babyName = useField('babyName');

const trySubmit = handleSubmit((formValues) => {
  console.log(formValues);
});
</script>

<template>
  <div class="p-20">
    <h3>Ajouter mon pronostic</h3>
    <form @submit="trySubmit">
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">Ton prénom</label>
        <input v-model="firstname.value.value" type="text" />
        <small class="form-error" v-if="firstname.errorMessage.value">{{
          firstname.errorMessage.value
        }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">Ton nom</label>
        <input v-model="lastname.value.value" type="text" />
        <small class="form-error" v-if="lastname.errorMessage.value">{{
          lastname.errorMessage.value
        }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">Date de l'accouchement</label>
        <input v-model="deliveryDate.value.value" type="date" />
        <small class="form-error" v-if="deliveryDate.errorMessage.value">{{
          deliveryDate.errorMessage.value
        }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <p class="mb-5">Sexe du bébé</p>
        <div>
          <input type="radio" id="girl" name="gender" value="girl" v-model="gender.value.value" />
          <label for="girl">Fille</label>
        </div>
        <div>
          <input type="radio" id="boy" name="gender" value="boy" v-model="gender.value.value" />
          <label for="boy">Garçon</label>
        </div>
        <small class="form-error" v-if="gender.errorMessage.value">{{
          gender.errorMessage.value
        }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">Poids (en Kg)</label>
        <input v-model="weight.value.value" type="number" />
        <small class="form-error" v-if="weight.errorMessage.value">{{
          weight.errorMessage.value
        }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">Taille (en cm)</label>
        <input v-model="height.value.value" type="number" />
        <small class="form-error" v-if="height.errorMessage.value">{{
          height.errorMessage.value
        }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">Une idée du prénom ?</label>
        <input v-model="babyName.value.value" type="text" />
        <small class="form-error" v-if="babyName.errorMessage.value">{{
          babyName.errorMessage.value
        }}</small>
      </div>
      <button class="btn btn-primary" :disabled="isSubmitting">Sauvegarder</button>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
