<template>
    <div class="flex w-full h-screen items-center justify-center p-6">
        <!-- <img src="@/assets/images/logoo.png" alt="Login" class="h-28 w-28" /> -->
        <Stepper v-model:value="activeStep" class="w-full max-w-lg min-h-[20rem]">
            <StepList>
                <Step v-slot="{ activateCallback, value, a11yAttrs }" asChild :value="1">
                    <div class="flex flex-row flex-auto gap-2" v-bind="a11yAttrs.root">
                        <button class="bg-transparent border-0 inline-flex flex-col gap-2" @click="activateCallback"
                            v-bind="a11yAttrs.header">
                            <span :class="[
                                'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                                {
                                    'bg-primary text-primary-contrast border-primary':
                                        value <= activeStep,
                                    'border-surface-200 dark:border-surface-700':
                                        value > activeStep,
                                },
                            ]">
                                <i class="pi pi-building" />
                            </span>
                        </button>
                        <Divider />
                    </div>
                </Step>
                <Step v-slot="{ activateCallback, value, a11yAttrs }" asChild :value="2">
                    <div class="flex flex-row flex-auto gap-2 pl-2" v-bind="a11yAttrs.root">
                        <button class="bg-transparent border-0 inline-flex flex-col gap-2" @click="activateCallback"
                            v-bind="a11yAttrs.header">
                            <span :class="[
                                'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                                {
                                    'bg-primary text-primary-contrast border-primary':
                                        value <= activeStep,
                                    'border-surface-200 dark:border-surface-700':
                                        value > activeStep,
                                },
                            ]">
                                <i class="pi pi-cogs" />
                            </span>
                        </button>
                        <Divider />
                    </div>
                </Step>
                <Step v-slot="{ activateCallback, value, a11yAttrs }" asChild :value="3">
                    <div class="flex flex-row pl-2" v-bind="a11yAttrs.root">
                        <button class="bg-transparent border-0 inline-flex flex-col gap-2" @click="activateCallback"
                            v-bind="a11yAttrs.header">
                            <span :class="[
                                'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                                {
                                    'bg-primary text-primary-contrast border-primary':
                                        value <= activeStep,
                                    'border-surface-200 dark:border-surface-700':
                                        value > activeStep,
                                },
                            ]">
                                <i class="pi pi-question-circle" />
                            </span>
                        </button>
                    </div>
                </Step>
            </StepList>

            <StepPanels>
                <!-- Section 1: Business Identification -->
                <StepPanel v-slot="{ activateCallback }" :value="1">
                    <div class="flex flex-col gap-4 mx-auto w-full max-w-lg min-h-[20rem]">
                        <div class="text-center mt-4 mb-4 text-xl font-semibold">
                            Section 1: Business Identification
                        </div>
                        <div class="field">
                            <label for="businessName" class="font-bold">Business/Company Name</label>
                            <InputText id="businessName" v-model="businessName" type="text"
                                placeholder="Enter business name" class="w-full" />
                        </div>
                        <div class="field">
                            <label for="phoneNumber" class="font-bold">Phone Number</label>
                            <InputText id="phoneNumber" v-model="phoneNumber" type="tel"
                                placeholder="Enter phone number" class="w-full" />
                        </div>
                        <div class="field">
                            <label for="email" class="font-bold">Email Address</label>
                            <InputText id="email" v-model="email" type="email" placeholder="Enter email address"
                                class="w-full" />
                        </div>
                        <div class="field">
                            <label for="location" class="font-bold">Business Location</label>
                            <InputText id="location" v-model="location" type="text" placeholder="City, State, Country"
                                class="w-full" />
                        </div>
                        <div class="font-bold">Business Type</div>
                        <div v-for="category in businessCategories" :key="category.key" class="flex items-center gap-2">
                            <RadioButton v-model="businessType" :inputId="category.key" name="dynamic"
                                :value="category.name" />
                            <label :for="category.key">{{ category.name }}</label>
                        </div>
                        <div class="font-bold">Years of Experience</div>
                        <div v-for="category in yearExperience" :key="category.key" class="flex items-center gap-2">
                            <RadioButton v-model="businessType" :inputId="category.key" name="dynamic1"
                                :value="category.name" />
                            <label :for="category.key">{{ category.name }}</label>
                        </div>
                    </div>
                    <div class="flex pt-6 justify-end">
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback(2)" />
                    </div>
                </StepPanel>

                <!-- Section 2: Technical Experience -->
                <StepPanel v-slot="{ activateCallback }" :value="2">
                    <div class="flex flex-col gap-4 mx-auto w-full max-w-lg min-h-[20rem]">
                        <div class="text-center mt-4 mb-4 text-xl font-semibold">
                            Section 2: Technical Experience
                        </div>
                        <div>
                            <label class="font-bold pb-3">Integration Experience</label>
                            <div v-for="category of experienceAreasList" :key="category.key"
                                class="flex items-center gap-2">
                                <Checkbox v-model="selectedCategories" :inputId="category.key" name="category"
                                    :value="category.name" />
                                <label :for="category.key">{{ category.name }}</label>
                            </div>
                        </div>
                        <div>
                            <label class="font-bold pb-3">Integration Experience</label>
                            <div v-for="category of brandsWorkedWithList" :key="category.key"
                                class="flex items-center gap-2">
                                <Checkbox v-model="selectedCategories" :inputId="category.key" name="category"
                                    :value="category.name" />
                                <label :for="category.key">{{ category.name }}</label>
                            </div>
                        </div>

                        <div class="field">
                            <label class="font-bold pb-3">Integration Experience</label>
                            <div v-for="category in integrationExperienceList" :key="category.key"
                                class="flex items-center gap-2">
                                <RadioButton v-model="integrationExperience" :inputId="category.key"
                                    name="integrationExperience" :value="category.name" />
                                <label :for="category.key">{{ category.name }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="flex pt-6 justify-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                            @click="activateCallback(1)" />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback(3)" />
                    </div>
                </StepPanel>

                <!-- Section 3: Technical Questions -->
                <StepPanel v-slot="{ activateCallback }" :value="3">
                    <div class="flex flex-col gap-4 mx-auto w-full max-w-lg min-h-[20rem]">
                        <div class="text-center mt-4 mb-4 text-xl font-semibold">
                            Section 3: Technical Questions
                        </div>
                        <div class="field">
                            <label for="purchaseSource">Where do you currently purchase your security products?</label>
                            <InputText id="purchaseSource" v-model="purchaseSource" type="text"
                                placeholder="Enter details" class="w-full" />
                        </div>
                        <div class="field">
                            <label>Do you currently purchase Hikvision products?</label>
                            <div v-for="category in options" :key="category.key" class="flex items-center gap-2">
                                <RadioButton v-model="purchaseHikvision" :inputId="category.key"
                                    name="purchaseHikvision" :value="category.name" />
                                <label :for="category.key">{{ category.name }}</label>
                            </div>
                        </div>
                        <div class="field">
                            <label>Do you require training on our products?</label>
                            <div v-for="category in options" :key="category.key" class="flex items-center gap-2">
                                <RadioButton v-model="requiresTraining" :inputId="category.key" name="requiresTraining"
                                    :value="category.name" />
                                <label :for="category.key">{{ category.name }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="flex pt-6 justify-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                            @click="activateCallback(2)" />
                        <Button label="Submit" icon="pi pi-check" iconPos="right" @click="submitForm" />
                    </div>
                </StepPanel>

                <StepPanel v-slot="{ activateCallback }" :value="4">
                    <div class="flex flex-col gap-4 mx-auto w-full max-w-lg min-h-[20rem]">
                        <div class="text-center mt-4 mb-4 text-xl font-semibold">
                            Thank You Page
                            {{ responseMessage }}
                        </div>
                    </div>
                    <div class="flex pt-6 justify-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                            @click="activateCallback(3)" />
                    </div>
                </StepPanel>
            </StepPanels>
        </Stepper>
    </div>
</template>



<script>
export default {
    data() {
        return {
            responseMessage: {},
            activeStep: 1,
            businessName: "",
            phoneNumber: "",
            email: "",
            location: "",
            businessType: null,
            experienceYears: null,
            experienceAreas: [],
            brandsWorkedWith: [],
            integrationExperience: null,
            purchaseSource: "",
            purchaseHikvision: null,
            requiresTraining: null,
            businessCategories: [
                { name: "System Integrator", key: "System Integrator" },
                { name: "Reseller", key: "Reseller" },
                { name: "Technician", key: "Technician" },
                { name: "Other", key: "Other" },
            ],
            yearExperience: [
                { name: "1 Year", key: "1 Year" },
                { name: "1-3 Years", key: "1-3 Years" },
                { name: "4-7 Years", key: "4-7 Years" },
                { name: "8+", key: "8+" },
            ],
            experienceAreasList: [
                { name: "CCTV Systems", key: "CCTV Systems" },
                { name: "Access Control Systems", key: "Access Control Systems" },
                { name: "Video Intercom Systems", key: "Video Intercom Systems" },
                {
                    name: "Networking and Computer Products",
                    key: "Networking and Computer Products",
                },
                { name: "Electrical Installations", key: "Electrical Installations" },
            ],
            brandsWorkedWithList: [
                { name: "Hikvision", key: "Hikvision" },
                { name: "Dahua", key: "Dahua" },
                { name: "Uniview", key: "Uniview" },
                { name: "Tandy", key: "Tandy" },
            ],
            integrationExperienceList: [
                { name: "Extensive Experience", key: "Extensive" },
                { name: "Some Experience", key: "Some" },
                { name: "No Experience", key: "None" },
            ],
            options: [
                { name: "Yes", key: "Yes" },
                { name: "No", key: "No" },
            ],
        };
    },
    methods: {
        async submitForm() {
            // Prepare form data
            const formData = {
                businessName: this.businessName,
                phoneNumber: this.phoneNumber,
                email: this.email,
                location: this.location,
                businessType: this.businessType,
                experienceYears: this.experienceYears,
                experienceAreas: this.experienceAreas,
                brandsWorkedWith: this.brandsWorkedWith,
                integrationExperience: this.integrationExperience,
                purchaseSource: this.purchaseSource,
                purchaseHikvision: this.purchaseHikvision,
                requiresTraining: this.requiresTraining,
            };

            console.log("Form Data:", formData);

            try {
                // Make POST request to the backend API
                const { $axios } = useNuxtApp();

                const response = await $axios.post(
                    "/user/technician-questionnaire",
                    formData
                );

                // Handle success
                this.responseMessage = response.data.message;
                this.activateCallback(4);
                if (response.status === 200) {
                    // alert('Form submitted successfully!');
                }
            } catch (error) {
                // Handle error
                console.error("Error submitting form:", error);
                // alert('There was an error submitting the form. Please try again.');
            } finally {
                // Reset form fields after submission
                // this.resetForm();
            }
        },
        resetForm() {
            this.businessName = "";
            this.phoneNumber = "";
            this.email = "";
            this.location = "";
            this.businessType = null;
            this.experienceYears = null;
            this.experienceAreas = [];
            this.brandsWorkedWith = [];
            this.integrationExperience = null;
            this.purchaseSource = "";
            this.purchaseHikvision = null;
            this.requiresTraining = null;
        },
    },
};
</script>

<style scoped>
/* .card {
    max-width: 40rem;
    margin: 0 auto;
    padding: 1.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
} */
.stepper-container {
    width: 100%;
    height: 100%;
}

.stepper-panel {
    min-height: 300px;
    max-width: 30rem;
    width: 100%;
}

@media (max-width: 768px) {
    .stepper-panel {
        min-height: 400px;
    }
}
</style>
