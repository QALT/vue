<template>
    <div class="container">
        <job-list></job-list>
    </div>
</template>

<script>
import JobList from '../components/JobList';
export default {
    name: 'Home',
    components: {
        JobList
    }
}
</script>