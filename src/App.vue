<template>
  <div>
    <h1>团队管理</h1>
    <ul>
      <li v-for="member in team.members" :key="member.id">
        {{ member.name }} - {{ member.role }} - {{ member.status }}
      </li>
    </ul>
    <button @click="updateLeaderStatus">切换领导的状态</button>
    <button @click="updateMemberStatus">切换成员的状态</button>
  </div>
</template>

<script setup>
import { reactive, watchEffect } from 'vue'
const team = reactive({
  members: [
    { id: 1, name: 'Alice', role: 'Leader', status: 'Active' },
    { id: 2, name: 'Bob', role: 'Member', status: 'Inactive' }
  ]
})

// 有两个方法，分别是对 Leader 和 Member 进行状态修改
function updateLeaderStatus() {
  const leader = team.members.find((me) => me.role === 'Leader')
  // 切换状态
  leader.status = leader.status === 'Active' ? 'Inactive' : 'Active'
}

function updateMemberStatus() {
  const member = team.members.find((member) => member.role === 'Member')
  member.status = member.status === 'Active' ? 'Inactive' : 'Active'
}

// 添加一个侦听器
watchEffect(() => {
  // 获取到 leader
  const leader = team.members.find((me) => me.role === 'Leader')
  // 输出 leader 当前的状态
  console.log('Leader状态:', leader.status)
})
</script>

<style scoped></style>