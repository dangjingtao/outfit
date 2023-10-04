// const divLetterAndNumber = (input) => {
//   var regex = /([A-Za-z]+)|(\d+)/g;
//   var matches = input.match(regex);
//   let output = "";
//   for (var i = 0; i < matches.length; i++) {
//     if (/[A-Za-z]/.test(matches[i])) {
//       output += matches[i];
//     } else {
//       output += "-" + matches[i];
//     }
//   }
//   return output.toUpperCase();
// };

export const getOutfit = (filename: string) => {
  // 从给定的文件路径中提取番号（DVD ID）
  // 通常是接收文件的路径，当然如果是普通字符串也可以
  // var filename = path.basename(filepath);
  // filename = cfg.MovieID.ignore_pattern.replace("", filename);
  if (filename?.toUpperCase().indexOf("ADD") > -1) {
    filename = filename.replace(/add/i, "-");
    return filename.toUpperCase();
  }

  const filename_lc = filename.toLowerCase();
  if (filename_lc.includes("fc2")) {
    // 根据FC2 Club的影片数据，FC2编号为5-7个数字
    const match = filename.match(
      /fc2[^a-z\d]{0,5}(ppv[^a-z\d]{0,5})?(\d{5,7})/i
    );
    if (match) {
      return "FC2-" + match[2];
    }
  } else if (filename_lc.includes("heydouga")) {
    const match = filename.match(/(heydouga)[-_]*(\d{4})[-_]0?(\d{3,5})/i);
    if (match) {
      return match.slice(1).join("-");
    }
  } else {
    // 先尝试移除可疑域名进行匹配，如果匹配不到再使用原始文件名进行匹配
    const no_domain = filename.replace(/\w{3,10}\.(com|net|app|xyz)/i, "");
    if (no_domain !== filename) {
      const avid: any = getOutfit(no_domain);
      if (avid) {
        return avid;
      }
    }
    // 匹配缩写成hey的heydouga影片。由于番号分三部分，要先于后面分两部分的进行匹配
    let match = filename.match(/(?:hey)[-_]*(\d{4})[-_]0?(\d{3,5})/i);
    if (match) {
      return "heydouga-" + match.slice(1).join("-");
    }
    // 普通番号，优先尝试匹配带分隔符的（如ABC-123）
    match = filename.match(/([a-z]{2,10})[-_](\d{2,5})/i);
    if (match) {
      return match[1] + "-" + match[2];
    }
    // 普通番号，运行到这里时表明无法匹配到带分隔符的番号
    // 先尝试匹配东热的red, sky, ex三个不带-分隔符的系列
    // （这三个系列已停止更新，因此根据其作品编号将数字范围限制得小一些以降低误匹配概率）
    match = filename.match(/(red[01]\d\d|sky[0-3]\d\d|ex00[01]\d)/i);
    if (match) {
      return match[1];
    }
    // 然后再将影片视作缺失了-分隔符来匹配
    match = filename.match(/([a-z]{2,})(\d{2,5})/i);
    if (match) {
      return match[1] + "-" + match[2];
    }
  }

  // 尝试匹配TMA制作的影片（如'T28-557'，他家的番号很乱）
  const matchTMA = filename.match(/(T28[-_]\d{3})/);
  if (matchTMA) {
    return matchTMA[1];
  }
  // 尝试匹配东热n, k系列
  const matchNK = filename.match(/(n\d{4}|k\d{4})/i);
  if (matchNK) {
    return matchNK[1];
  }
  // 尝试匹配纯数字番号（无码影片）
  const matchUn = filename.match(/(\d{6}[-_]\d{2,3})/);
  if (matchUn) {
    return matchUn[1];
  }
  // 如果还是匹配不了，尝试将')('替换为'-'后再试，少部分影片的番号是由')('分隔的
  if (filename.includes(")(")) {
    const avid: any = getOutfit(filename.replace(/\)\(/g, "-"));
    if (avid) {
      return avid;
    }
  }
  // // 如果最后仍然匹配不了番号，则尝试使用文件所在文件夹的名字去匹配
  // if (fs.existsSync(filepath)) {
  //   var norm = path.normalize(filepath);
  //   var folder = norm.split(path.sep)[-2];
  //   return getOutfit(folder);
  // }
  return "";
};

export default getOutfit;
