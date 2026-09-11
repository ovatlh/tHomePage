<script setup lang="ts">
// Libs Imported
import { inject, nextTick, onMounted, ref } from "vue";

// Code Imported

// Components
import Button from "openvue/button";

// Interfaces

// Props
const dialogRef = inject("dialogRef") as any;
const name = ref<string>("");

// Emits
const emits = defineEmits(["customEvent"]);

// Code
function fnCustom() {
	emits("customEvent", { fnCustom: "test" });
}

async function fnClose() {
	dialogRef.value.close(null);
}

function fnSave() {
	dialogRef.value.close({ form: { id: 1, name: "test", desc: "test", isVisible: true } });
}

async function Init() {
	await nextTick();
	console.log(dialogRef);
}

// Exposes

Init();

onMounted(() => {
	name.value = dialogRef.value.data.name;
});
</script>

<template>
	<div class="site-form-comp dialog-custom grid grid-row">
		<div class="container header grid grid-column gap-1 padding-1 align-items-center justify-content-space-between sticky-top">
			<p class="font-bold">HEADER</p>

			<Button
				rounded
				variant="outlined"
				icon="oi oi-times"
				severity="secondary"
				@click="fnClose"
			/>
		</div>

		<div class="container footer padding-1 sticky-bottom">
			<div class="container grid grid-column gap-1 justify-self-end">
				<Button
					variant="outlined"
					icon="oi oi-question"
					label="Custom"
					severity="secondary"
					@click="fnCustom"
				/>

				<Button
					label="Cancel"
					icon="oi oi-times"
					severity="secondary"
					@click="fnClose"
				/>

				<Button
					label="Save"
					icon="oi oi-save"
					severity="contrast"
					@click="fnSave"
				/>
			</div>
		</div>

		<div class="container content grid grid-row gap-1 padding-1">
			<p>template-dialog-comp: {{ name }}</p>

			<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, natus saepe aut, est ipsa ullam corrupti voluptas illum corporis eum officia rem dolor aliquid, porro error blanditiis! Dolore, nihil cum?</p>
			<p>Molestias ratione voluptatum commodi voluptas quo, numquam, nam nihil, nostrum est enim optio ipsam incidunt modi alias veniam. Iure consequuntur ut quam, rem aspernatur odio architecto distinctio velit ipsam accusantium.</p>
			<p>Eaque possimus, alias omnis corrupti reprehenderit ratione accusamus cumque veniam pariatur, perspiciatis, libero aut? Veritatis, repellendus. Maiores ratione ipsam optio reprehenderit ea aspernatur ab fugiat architecto autem atque. Iure, atque!</p>
			<p>Velit odit ducimus ipsam commodi inventore sit voluptatem. Soluta dolorum, consectetur iure eum voluptatem omnis inventore ab laudantium! At vel officia non iste voluptates porro iure corporis, aut natus ipsam?</p>
			<p>Amet ipsam iure natus qui! Facere alias reiciendis id est magnam non, nemo officia laudantium vitae, fugiat enim eligendi, neque repudiandae error sapiente. Illo quia temporibus ea consequuntur, quis saepe.</p>
			<p>Nemo quae, quos debitis ipsum mollitia possimus iusto quasi rem tempora totam impedit consectetur nisi sint dolores quis repudiandae? Ut eum a cum ab quod enim rem fuga mollitia voluptas!</p>
			<p>Accusantium minima molestiae sint nisi quasi praesentium soluta, exercitationem modi a quis consequatur rem voluptatibus vero reprehenderit voluptates impedit tenetur ea ipsam placeat! Tempora qui earum laboriosam adipisci ut asperiores?</p>
			<p>Cumque, quidem! Culpa sint laudantium saepe impedit illum deserunt veniam enim ad nostrum fugit eligendi repudiandae ea maxime eveniet quisquam iste sunt perspiciatis corrupti amet voluptate error, odit possimus consectetur.</p>
			<p>Provident illo perferendis, minus voluptates, voluptatem cupiditate maxime eaque, eius blanditiis repudiandae architecto ipsa est incidunt harum temporibus. Totam enim tempore praesentium vel necessitatibus, inventore asperiores nihil temporibus optio consectetur?</p>
			<p>Illum quisquam ad vitae explicabo voluptate! Pariatur molestiae hic accusantium numquam beatae dignissimos praesentium ab totam placeat atque voluptas saepe blanditiis, quisquam natus odit eveniet sapiente quam? Debitis, autem deleniti!</p>
			<p>Excepturi perspiciatis voluptates id ut explicabo omnis neque accusantium, incidunt dolore ipsam eligendi eius dignissimos quia exercitationem qui eos sit autem sed vero molestias hic iste. Vero eos velit alias!</p>
			<p>Vero, officia sunt distinctio earum fugit illo iste laboriosam labore explicabo quia dolores quam facilis ab placeat necessitatibus ut maxime, tempore ea soluta odit repellendus facere consectetur dicta? Minus, voluptates.</p>
			<p>Consequuntur veritatis odio alias tenetur reiciendis beatae reprehenderit natus est dolorum cum perspiciatis nesciunt quas earum sunt vel dolore dolor incidunt numquam consequatur, sint, animi necessitatibus nam? Omnis, laudantium dicta!</p>
			<p>Sint quo veritatis reiciendis voluptatum dolores eius, sed commodi recusandae molestias aut necessitatibus natus repellat dolor eum ipsum corrupti, delectus laboriosam nemo impedit amet quod! Libero ipsum deleniti quo sapiente!</p>
			<p>Fugiat ratione aspernatur, neque perferendis id maxime ut explicabo ipsum, dolorum maiores sunt numquam! Beatae nulla, magnam perspiciatis tempora exercitationem placeat, repudiandae nobis voluptatum ducimus illo voluptates hic omnis nihil.</p>
			<p>Molestias sapiente quasi porro fuga eveniet, quae optio minima quisquam ex delectus voluptate nostrum perspiciatis iste ratione odit dolorem maiores nihil dicta expedita illum. Dolorem fugit officiis totam odio eius.</p>
			<p>Cumque eveniet voluptatem libero alias esse totam laborum obcaecati id, ab nesciunt nihil a hic minus incidunt tempore dolorum aperiam ex nobis impedit. Atque iusto voluptate nesciunt debitis deserunt assumenda.</p>
			<p>Sint et quod doloremque inventore corrupti sequi sunt nisi at sit assumenda a, quos architecto eveniet consectetur velit voluptas nostrum similique ipsam dignissimos cumque? Repellendus optio accusantium error vel fugiat.</p>
			<p>Quidem expedita ad autem earum beatae alias, blanditiis optio deserunt ipsum corrupti deleniti. Modi voluptates corrupti praesentium? Fugiat in iure repudiandae necessitatibus odit et dignissimos magnam, cumque rerum nemo porro.</p>
			<p>Aliquid incidunt, dicta atque hic ut esse laudantium cupiditate dolorem magnam aliquam placeat. Earum vel consectetur animi. Ad accusamus exercitationem praesentium dicta voluptatibus perferendis accusantium, illo aperiam veniam laboriosam eligendi.</p>
			<p>Eos non voluptatem quisquam facere nam? Possimus alias illo fugit veritatis voluptate numquam? Repudiandae ratione blanditiis ad nulla nemo vel quaerat molestias repellat quidem non molestiae, natus exercitationem libero culpa.</p>
			<p>Nulla beatae, repellendus dignissimos, perferendis maxime rerum vitae ab ad voluptates ratione iste! Repellat maxime assumenda id dignissimos, possimus iusto sit rerum ipsam vitae animi fugit voluptas explicabo, dicta accusamus?</p>
			<p>Dignissimos nemo et asperiores tempora recusandae atque distinctio magni, praesentium quidem at cumque? Delectus quasi illo, maxime iste voluptate debitis error, deleniti corrupti dolor minus dolorem laborum fugiat possimus libero!</p>
			<p>Dignissimos autem libero aperiam temporibus provident vero dolorem deleniti. Tempore reprehenderit perspiciatis ad exercitationem, natus dignissimos tenetur suscipit vero eius, fugit quas laborum dolor id debitis minus delectus, ratione eligendi.</p>
			<p>Quae laborum, perferendis nostrum porro dolores, non, officia unde consectetur blanditiis eligendi labore consequuntur! Assumenda nisi nam molestiae, sint dolorum repudiandae optio fugit vero rerum et, eum architecto numquam voluptatum!</p>
			<p>Error consequuntur rem beatae alias aliquid labore, laudantium iusto ullam quas, nisi quia totam ab? Ad animi autem unde blanditiis corporis quia possimus, error sapiente recusandae laudantium odit id. Quisquam!</p>
			<p>Fuga voluptates tempore suscipit autem illum voluptatum blanditiis debitis reiciendis quo nostrum, inventore minus veniam qui corporis quos cum fugiat officia iste quidem soluta. Consectetur dolorem perspiciatis quasi asperiores eius.</p>
			<p>Dolore animi a labore nulla sapiente expedita, adipisci modi voluptatem facilis eum dolor consectetur perferendis laboriosam aliquam dignissimos. Quia numquam dignissimos, quis neque sint voluptatum doloremque deleniti. Ducimus, rem minus!</p>
			<p>Esse sed hic nesciunt adipisci expedita modi doloremque id cum tenetur alias sequi dolores, rem laudantium, maiores nisi praesentium quae necessitatibus? Tempora, at itaque consequatur repudiandae laborum exercitationem libero vel.</p>
			<p>Quasi aspernatur ratione accusantium assumenda nisi qui iure commodi ut esse doloribus alias fugit placeat quo, unde velit cupiditate eius repellendus maxime voluptatum vero temporibus quis atque. Earum, similique quaerat.</p>
		</div>
	</div>
</template>
