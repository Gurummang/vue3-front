<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <main>
      <div class="space-y-4">
        <div v-for="file in files" :key="file.path" class="flex items-center justify-between border-b pb-2">
          <span class="text-sm">{{ file.path }}</span>
            <!-- @click="() => handleDownload(file)" -->
          <button 
            class="px-3 py-1 font-medium tracking-wide text-white text-sm bg-orange hover:bg-orange-500"
            @click="downloadFile"
            :disabled="file.isDownloading"
          >
            {{ file.isDownloading ? '다운로드 중...' : '다운로드' }}
          </button>
        </div>
      </div>

      <a 
        href="/some-url"
        @click.prevent="downloadFile"
      >클릭</a>

      <div>
        <textarea v-model="encodedText" placeholder="인코딩된 파일 정보" readonly></textarea>
        <button @click="handleDownloadText">텍스트 다운로드</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'

const mmm = () => {
  alert('hhhhh');
}

const files = ref([
  { path: '/path/to/your/file1.txt', hash: '886b15487fa6ae32484b1bb291abb6ac8ad78d5c09ad686651676215719f598b', isDownloading: false },
  { path: '/path/to/your/file2.txt', hash: '7a38bf81f383f69433ad6e900d35b3e2385593f76a7b7ab5d4355b8ba41ee24b', isDownloading: false },
  { path: '/path/to/your/file3.txt', hash: 'c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7df31ad9e51a', isDownloading: false },
  { path: '/path/to/your/file4.txt', hash: 'f2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2', isDownloading: false },
  { path: '/path/to/your/file5.txt', hash: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', isDownloading: false },
]);

const encodedText = computed(() => {
  return files.value.map(file => {
    const fileName = file.path.split('/').pop();
    const encodedData = btoa(`${fileName}-${file.hash}`);
    return `${file.path}: ${encodedData}`;
  }).join('\n');
});

const fileName = "requirements.txt";
const fileHash = "886b15487fa6ae32484b1bb291abb6ac8ad78d5c09ad686651676215719f598b";

// Function to fetch and download the file from the API
const downloadFile = async() => {
  // Create the file_name using btoa
  const fileNameHash = btoa(`${fileName}-${fileHash}`);

  try {
    const response = await fetch('https://back.grummang.com/api/v1/board/slack/files/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file_name: fileNameHash
      }),
      credentials: 'include'  // Ensures cookies are sent with the request
    });

    console.log(response);

    if (!response.ok) {
      console.error('Failed to fetch the file');
      return;
    }

    // Extract the filename from the Content-Disposition header
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = ''; // Default filename
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+)"/);
      if (match && match[1]) {
        filename = match[1];
      }
    }

    console.log('파일명:', filename);
    // Convert the response to a Blob (binary data)
    const blob = await response.blob();

    // Create a URL for the Blob and trigger the download
    const url = window.URL.createObjectURL(blob);
    console.log('url : ',url);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename; // Set the filename from the header
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // Clean up the DOM
    window.URL.revokeObjectURL(url); // Release memory
  } catch (error) {
    console.error('Error:', error);
  }
}

const handleDownload = async (file) => {
  if (file.isDownloading) return;

  file.isDownloading = true;
  
  try {
    const downloadToken = await getDownloadToken(file);
    const downloadUrl = `/api/v1/files/download/${downloadToken}`;
    
    const response = await fetch(downloadUrl);
    console.log('wwwww', response);
    if (!response.ok) throw new Error('다운로드 실패');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = getFilenameFromResponse(response) || file.path.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('다운로드 오류:', error);
    alert('파일 다운로드 중 오류가 발생했습니다.');
  } finally {
    file.isDownloading = false;
  }
};

const getFilenameFromResponse = (response) => {
  const contentDisposition = response.headers.get('Content-Disposition');
  if (!contentDisposition) return null;

  const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
  return filenameMatch ? filenameMatch[1] : null;
};

const handleDownloadText = () => {
  const fileName = 'encoded_file_info.txt';
  const fileContent = encodedText.value;
  
  const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  
  const element = document.createElement('a');
  element.href = url;
  element.download = fileName;
  
  document.body.appendChild(element);
  element.click();
  
  document.body.removeChild(element);
  window.URL.revokeObjectURL(url);
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>