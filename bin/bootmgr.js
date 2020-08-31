const npmlog = require("npmlog")
const readline = require("readline")

npmlog.info("BootMGR", "Loading UEFI...")
const Bootloader = function () {

    console.clear()
    npmlog.level = -Infinity
    npmlog.verbose("UEFI", "Loading Read Line Interface...")
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    npmlog.info("UEFI", "Please Select the System you would like to boot from.")
    rl.question("", (answer) => {
        if (answer == "ReactorMGR") {
            LoadSystem("ReactorMGR")
            rl.close()
        } else if (answer == "Recovery") {
            LoadSystem("RecoverPART")
            rl.close()
        } else {
            npmlog.error("UEFI", "Whoops!")
            npmlog.error("UEFI", "You need to select a correct option!")
            npmlog.error("UEFI", "'ReactorMGR' or 'Recovery'!")
            npmlog.notice("UEFI", "Press any key to continue.")
            rl.question("", () => {
                console.clear()
                process.exit(0)
            })
        }
    })
}

const LoadSystem = function (OS) {
    const ReactorMGR = require("./../lib/OP/bin/reactormgr.js")
    ReactorMGR.ReactorMGR()
}

Bootloader(false)