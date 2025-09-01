<script setup lang="ts">
import { ref } from 'vue';

const isActive = ref(false);

const handleRedirectBlankSubmit = (url: string): void => {
  window.open(url, '_blank');
};

const handleWhatsappSubmit = (): void => {
  const whatsappLink = 'https://wa.me/5531999999999';
  window.open(whatsappLink, '_blank');
};

</script>

<template>
  <footer id="footer" class="bg-white text-black p-3 w-100 text-center my-10" :class="{ active: isActive, 'desactive': !isActive }">
    <div class="row justify-content-center align-items-start w-100 my-5">
      <!-- Dúvidas frequentes -->
      <div class="col-12 col-md-4">
        <ul>
          <li>
            <h4>Dúvidas frequentes</h4>
            <hr />
          </li>
          <p>Como comprar</p>
          <p>Encomendas</p>
          <p>Entregas</p>
          <p>Devoluções</p>
        </ul>
      </div>

      <!-- Formas de pagamento -->
      <div class="col-12 col-md-4">
        <ul>
          <li>
            <h4>Formas de pagamento</h4>
            <hr />
          </li>
          <p>PIX</p>
          <p>Boleto</p>
          <p>Cartão de crédito</p>
          <p>Outros</p>
        </ul>
      </div>

      <!-- Redes sociais -->
      <div class="col-12 col-md-4 col-lg-3">
        <ul>
          <li>
            <h4>Redes sociais</h4>
            <hr />
          </li>
          <li>
            <a @click="handleRedirectBlankSubmit('https://instagram.com/bolerada67_3.0')">
              <span>
                <font-awesome-icon icon="fa-brands fa-instagram" class="icon-mobile-md" />
                <span class="text-icon mx-3">artesanaldoceriacg</span>
              </span>
            </a>
          </li>
          <li>
            <a @click="handleWhatsappSubmit">
              <span>
                <font-awesome-icon icon="fa-brands fa-whatsapp" class="icon-mobile-md" />
                <span class="text-icon mx-3">Whatsapp</span>
              </span>
            </a>
          </li>
          <li>
            <a @click="handleWhatsappSubmit">
              <span>
                <font-awesome-icon icon="fa-solid fa-mail-forward" class="icon-mobile-md" />
                <span class="text-icon mx-3">contato@artesanaldoceriacg.com.br</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
