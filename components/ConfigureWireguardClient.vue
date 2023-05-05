<script lang="tsx" setup>
import cidr from 'ip-cidr'
import { ServerFragment, PeerFragment } from '@/gql'
import { generateWireguardClientConfig } from '@/utils'
const props = defineProps<{
  server: ServerFragment
  peer: PeerFragment
}>()

const form = reactive({})

function getPeerAddress(
  server: ServerFragment = props.server,
  peer: PeerFragment = props.peer
) {
  try {
    let serverIp = new cidr(server.address)
    let peerIps = peer.allowedIPs?.map((ip) => new cidr(ip)) || []
    let match = peerIps.filter(
      (e) =>
        e.address.groups * 8 == e.address.subnetMask &&
        serverIp.contains(e.address.address)
    )
    if (match.length !== 1) return

    let [ip] = match
    return `${ip.address.addressMinusSuffix}/${serverIp.address.subnetMask}`
  } catch {}
}

const config = ref(
  generateWireguardClientConfig(
    {
      ...props,
      address: getPeerAddress() || '',
      allowedIPs: [] as string[],
    },
    { keepEmpty: ['PrivateKey'] }
  )
)

const downloadConfigLink = (
  <a
    class="-app-link"
    href="javascript: void(0);"
    onClick={() => downloadConfig()}
  >
    Download your WireGuard config
  </a>
)

const instructionsMap = {
  windows: (
    <div class="ui massive list">
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">
            Download and install the{' '}
            <a
              class="-app-link"
              target="_blank"
              href="https://www.wireguard.com/install/?downloadwindowsprealpha=1"
            >
              WireGuard client for Windows
            </a>
          </div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">
            {downloadConfigLink} and import it into WireGuard
          </div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">Active your VPN</div>
        </div>
      </div>
    </div>
  ),
  osx: (
    <div class="ui massive list">
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">
            {downloadConfigLink} into your Downloads folder
          </div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">
            Install the{' '}
            <a
              target="_blank"
              class="-app-link"
              href="https://itunes.apple.com/us/app/wireguard/id1451685025"
            >
              WireGuard app
            </a>{' '}
            from the Mac App Store
          </div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">
            Launch WireGuard, and click on the WireGuard icon in the menu bar
          </div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">
            Click on the WireGuard icon and select "Import tunnel(s) from file"
          </div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">
            Import your WireGuard config file from your Downloads folder
          </div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">Activate your WireGuard tunnel</div>
        </div>
      </div>
    </div>
  ),
  ios: (
    <div class="ui massive list">
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">
            Install{' '}
            <a
              target="_blank"
              class="-app-link"
              href="https://itunes.apple.com/us/app/wireguard/id1441195209"
            >
              WireGuard
            </a>{' '}
            from the App Store
          </div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">
            {downloadConfigLink} and open with WireGuard or use the QR code
            below
          </div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">Go to your iOS Settings</div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">Turn your VPN on</div>
        </div>
      </div>
    </div>
  ),

  android: (
    <div class="ui massive list">
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">
            Install{' '}
            <a
              target="_blank"
              class="-app-link"
              href="https://play.google.com/store/apps/details?id=com.wireguard.android"
            >
              WireGuard for Android
            </a>
          </div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">
            {downloadConfigLink} or use the QR code below
          </div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">Connect to your VPN server</div>
        </div>
      </div>
    </div>
  ),

  linux: (
    <div class="ui massive list">
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">
            Install{' '}
            <a
              target="_blank"
              class="-app-link"
              href="https://www.wireguard.com/install/"
            >
              WireGuard
            </a>
          </div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">{downloadConfigLink}</div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">Connect to your VPN server</div>
        </div>
      </div>
    </div>
  ),
  default: (
    <div class="ui massive list">
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">
            Install{' '}
            <a
              target="_blank"
              class="-app-link"
              href="https://www.wireguard.com/install/"
            >
              WireGuard
            </a>
          </div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">{downloadConfigLink}</div>
        </div>
      </div>
      <div class="item">
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="description">Connect to your VPN server</div>
        </div>
      </div>
    </div>
  ),
}

const platform = ref<keyof typeof instructionsMap>('default')

const instructions = computed(
  () => instructionsMap[platform.value] || instructionsMap.default
)

const platforms = Object.keys(instructionsMap).map((e) => ({
  value: e,
  label: { default: 'WireGuard' }[e] || e,
}))

function downloadConfig() {
  const file = new File([config.value], 'wireguard.conf', {
    type: 'application/x-wireguard-conf',
  })

  const url = URL.createObjectURL(file)

  Object.assign(document.createElement('a'), {
    href: url,
    download: file.name,
    target: '_blank',
  }).click()

  URL.revokeObjectURL(url)
}
// console.log(new cidr(props.server.address))
// console.log(new cidr('2001:db8:3333:4444:5555:6666:7777:8888/64'))
</script>
<template>
  <AppDialog title="Wireguard client config" card-classes="-w-500px">
    <q-input v-model="config" type="textarea" autogrow filled></q-input>
    <div class="-max-w-300px -mx-auto -my-3">
      <AppQrcode :value="config" />
    </div>

    <q-btn-toggle
      v-model="platform"
      toggle-color="secondary"
      color="dark"
      :options="platforms"
      size="sm"
      class="-w-full -[&_>*]:flex-1"
      unelevated
    />
    <div class="-prose -mt-4">
      <VNode :node="instructions"></VNode>
    </div>
    <template #secondaryActions>
      <q-btn
        label="Download config"
        color="positive"
        @click="downloadConfig"
      ></q-btn>
    </template>
  </AppDialog>
</template>
<style></style>
