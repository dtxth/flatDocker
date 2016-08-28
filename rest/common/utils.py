from sys import stderr
from flask import json

__author__ = 'dtxth'

from hachoir_core.error import HachoirError
from hachoir_core.cmd_line import unicodeFilename
from hachoir_parser import createParser
from hachoir_core.tools import makePrintable
from hachoir_metadata import extractMetadata
from hachoir_core.i18n import getTerminalCharset

def get_metadata(realname):
    meta = {}
    unicodename, realname = unicodeFilename(realname), realname
    parser = createParser(unicodename, realname)
    if not parser:
        print >> stderr, "Unable to parse file"
        # exit(1)
        return meta
    try:
        metadata = extractMetadata(parser)
    except HachoirError, err:
        print "Metadata extraction error: %s" % unicode(err)
        metadata = None
    if not metadata:
        print "Unable to extract metadata"
        # exit(1)
        return meta


    text = metadata.exportPlaintext(human=False, line_prefix="")

    for line in text[1:]:
        key, value = line.split(":", 1)
        meta[key] = value

    return meta


from bson import json_util
from bson.objectid import ObjectId

def to_json(data):
    """Convert Mongo object(s) to JSON"""
    return json.dumps(data, default=json_util.default)