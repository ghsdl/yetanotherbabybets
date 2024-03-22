<script setup lang="ts">
import { supabase } from '../supabase/supabase';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { ref } from 'vue';
import type { FormProps } from 'element-plus';
import { Message, CircleCheck, Lock } from '@element-plus/icons-vue';

const required = { required_error: 'Veuillez renseigner ce champ' };
const labelPosition = ref<FormProps['labelPosition']>('top');

const validationSchema = toTypedSchema(
  z
    .object({
      email: z.string(required).email('Veuillez renseigner une adresse email valide'),
      password: z.string(required).min(1, 'Le mot de passe doit contenir au moins 1 caractère'),
      confirmPassword: z
        .string(required)
        .min(1, 'Le mot de passe doit contenir au moins 1 caractère')
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Les mots de passe ne correspondent pas',
      path: ['confirmPasswordValue']
    })
);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema
});

const router = useRouter();
const errorMsg = ref<string | null>(null);

const register = async () => {
  if (passwordValue.value === confirmPasswordValue.value) {
    try {
      const { error } = await supabase.auth.signUp({
        email: emailValue.value,
        password: passwordValue.value
      });

      if (error) {
        errorMsg.value = error.message;
      } else {
        router.push('/login');
      }
    } catch (error) {
      errorMsg.value = (error as Error).message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = 'Error: Passwords do not match';
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
};

const { value: emailValue, errorMessage: emailError } = useField('email');
const { value: passwordValue, errorMessage: passwordError } = useField('password');
const { value: confirmPasswordValue, errorMessage: confirmPasswordError } =
  useField('confirmPassword');

const trySubmit = handleSubmit(() => {
  register();
});
</script>

<template>
  <div class="container">
    <div class="form p-20">
      <el-form :label-position="labelPosition" label-width="auto">
        <el-form-item label="Email" class="item" :error="emailError">
          <el-input class="input" size="large" placeholder="Email" v-model="emailValue">
            <template #prefix>
              <el-icon class="el-input__icon"><message /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Mot de passe" class="item" :error="passwordError">
          <el-input
            style="width: 100%"
            size="large"
            placeholder="Mot de passe"
            show-password
            v-model="passwordValue"
            class="input"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Confirmer le mot de passe" :error="confirmPasswordError" class="item">
          <el-input
            size="large"
            placeholder="Confirmer le mot de passe"
            show-password
            v-model="confirmPasswordValue"
            class="input"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><circleCheck /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button @click="trySubmit" color="#f4a15f" class="button" :disabled="isSubmitting" plain
          >S'inscrire</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form {
  width: 450px;
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
}

.button {
  width: 100%;
  margin-top: 10px;
  font-family: var(--font-family);
}

.el-form-item {
  margin-bottom: 28px;
}

.input {
  --el-input-focus-border-color: var(--primary-2);
  --el-input-icon-color: var(--primary-2);
  margin-bottom: 6px;
  ::placeholder {
    font-family: var(--font-family);
  }
}
</style>
../supabase/supabase