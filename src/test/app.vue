<script setup lang="ts">
// @ts-ignore
import { mock } from "./mock";

import * as THREE from "three";
import { ColorRepresentation } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted, ref, watchEffect } from "vue";
import { Turtle } from "./Turtle";

const parent = new THREE.Object3D();
const container = ref<HTMLElement>();

onMounted(async () => {
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 40);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(() => renderer.render(scene, camera));
    container.value!.appendChild(renderer.domElement);
    scene.add(parent);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(0.8, 1, 0.5);
    parent.add(light);
    parent.add(new THREE.AmbientLight(0xffffff, 0.5));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 2000;
    window.addEventListener("resize", () => {
        {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    });

    function addBox(size: number, color: ColorRepresentation): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(size, size, size);
        const mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshPhongMaterial({
                color: color
            })
        );
        parent.add(mesh);

        return mesh;
    }

    function addLine(
        sx: number,
        sy: number,
        sz: number,
        ex: number,
        ey: number,
        ez: number,
        color: ColorRepresentation
    ) {
        const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(sx, sy, sz), new THREE.Vector3(ex, ey, ez)]),
            new THREE.LineBasicMaterial({ color })
        );
        parent.add(line);
    }

    function addTurtle(): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
        const mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshPhongMaterial({
                color: 0xa0a0a0
            })
        );
        parent.add(mesh);
        const screenGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.2);
        const screenMesh = new THREE.Mesh(
            screenGeometry,
            new THREE.MeshPhongMaterial({
                color: 0x202020
            })
        );
        mesh.add(screenMesh);
        screenMesh.position.set(0, 0, 0.3);

        return mesh;
    }

    const turtleGeometry = addTurtle();
    watchEffect(() => {
        turtleGeometry.position.set(
            Turtle.mainTurtle.position.x,
            Turtle.mainTurtle.position.y,
            Turtle.mainTurtle.position.z
        );
    });
    watchEffect(() => {
        turtleGeometry.rotation.set(0, (Turtle.mainTurtle.orientation.value * Math.PI) / 2, 0);
    });

    addLine(0, 0, 0, 1, 0, 0, 0xff0000);
    addLine(0, 0, 0, 0, 1, 0, 0x00ff00);
    addLine(0, 0, 0, 0, 0, 1, 0x0000ff);

    const worker = new Worker(new URL("./sim-worker.ts", import.meta.url), { type: "module" });

    worker.onmessage = (ev) => {
        if (ev.data.type == "turtle") {
            const turtle = ev.data.data;
            Turtle.mainTurtle.position.x = turtle.position.x;
            Turtle.mainTurtle.position.y = turtle.position.y;
            Turtle.mainTurtle.position.z = turtle.position.z;

            Turtle.mainTurtle.orientation.value = turtle.orientation;
            for (let i = 0; i < 16; i++) Turtle.mainTurtle.inventory[i] = turtle.inventory[i];
            Turtle.mainTurtle.fuelLevel.value = turtle.fuelLevel;
            Turtle.mainTurtle.selectedSlot.value = turtle.selectedSlot;
        } else if (ev.data.type == "block") {
            const block = ev.data.data;
            const blocks = {
                "mysticalagradditions:insanium_farmland": { size: 1, color: 0x505005 },
                "ae2:fluix_glass_cable": { size: 0.4, color: 0xff50a5 },
                "ae2:black_smart_dense_cable": { size: 0.8, color: 0 },
                "ae2:growth_accelerator": { size: 1, color: 0xa0a0a0 }
            };

            const box = addBox(blocks[block.block].size, blocks[block.block].color);
            box.position.set(block.x, block.y, block.z);
        }
    };

    console.log("vue");
});
</script>

<template>
    <div>fuelLevel: {{ Turtle.mainTurtle.fuelLevel }}</div>
    <div>
        <div v-for="i in [0, 1, 2, 3]" :key="i" class="flex flex-grow justify-evenly">
            <div
                v-for="il in [0, 1, 2, 3]"
                :key="il"
                :class="{ 'bg-red-300': Turtle.mainTurtle.selectedSlot.value == i * 4 + il }"
            >
                {{
                    Turtle.mainTurtle.inventory[i * 4 + il].amount == 0
                        ? "---"
                        : Turtle.mainTurtle.inventory[i * 4 + il].amount +
                          " " +
                          Turtle.mainTurtle.inventory[i * 4 + il].name
                }}
            </div>
        </div>
    </div>
    <div ref="container"></div>
</template>
